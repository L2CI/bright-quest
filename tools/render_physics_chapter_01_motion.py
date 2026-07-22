import json
import math
import os
from pathlib import Path

from manim import *


COBALT = "#1659B7"
INK = "#102A43"
CREAM = "#FFF8E8"
GOLD = "#F3B33D"
ORANGE = "#F07C36"
CYAN = "#37C8D7"
GREEN = "#2D9C72"
RED = "#D64545"
VIOLET = "#6D4BEF"
MAGENTA = "#D83798"
MUTED = "#55738B"


class PhysicsChapter01Motion(Scene):
    def construct(self):
        self.course_dir = Path(os.environ["BQ_PHYSICS_COURSE_DIR"])
        self.timeline = json.loads(Path(os.environ["BQ_TIMELINE_PATH"]).read_text(encoding="utf-8"))
        self.assets = self.course_dir / "assets" / "source" / "motion-v2"
        self.dynamic = []
        self.focus = None
        self.replay = None
        background = ImageMobject(str(self.assets / "workshop-stage-16x9.png")).set_width(config.frame_width * 1.04)
        background.set_z_index(-100)
        background.add_updater(
            lambda mob: mob.move_to([
                0.16 * math.sin(self.time * 0.55),
                0.035 * math.cos(self.time * 0.41),
                0,
            ])
        )
        self.add(background, self.header())
        self.wait(0.25)
        handlers = [
            self.mystery, self.interaction, self.arrows, self.motion_evidence,
            self.push_ended, self.push_pull, self.non_contact, self.classification,
            self.fair_test, self.repair, self.predict, self.exit_scene,
        ]
        for index, cue in enumerate(self.timeline["cues"]):
            started = self.time
            self.transition(index, cue["title"])
            handlers[index]()
            self.finish(started, cue)
        if self.time < self.timeline["duration"]:
            self.wait(self.timeline["duration"] - self.time)

    def header(self):
        rail = Rectangle(width=config.frame_width, height=0.70, stroke_width=0, fill_color=INK, fill_opacity=0.97).to_edge(UP, buff=0)
        brand = Text("BRIGHT QUEST  /  PHYSICS 101", font_size=20, weight=BOLD, color=CREAM).to_edge(LEFT, buff=0.42).shift(UP * 3.25)
        chapter = Text("01  FORCE IS AN INTERACTION", font_size=19, weight=BOLD, color=GOLD).to_edge(RIGHT, buff=0.42).shift(UP * 3.25)
        return VGroup(rail, brand, chapter).set_z_index(50)

    def transition(self, index, title):
        heading = self.cue_heading(index, title)
        animations = [FadeOut(item, shift=DOWN * 0.04) for item in self.dynamic if item in self.mobjects]
        animations.append(FadeIn(heading, shift=RIGHT * 0.10))
        self.play(AnimationGroup(*animations, lag_ratio=0), run_time=0.45 if index else 0.35)
        for item in self.dynamic:
            self.remove(item)
        self.dynamic = [heading]
        self.focus = heading
        self.replay = None

    def cue_heading(self, index, title):
        badge = RoundedRectangle(width=0.78, height=0.46, corner_radius=0.12, stroke_width=0, fill_color=GOLD, fill_opacity=1)
        number = Text(f"{index + 1:02d}", font_size=18, weight=BOLD, color=INK).move_to(badge)
        text = Text(title.upper(), font_size=23, weight=BOLD, color=INK)
        if text.width > 6.15:
            text.scale_to_fit_width(6.15)
        row = VGroup(VGroup(badge, number), text).arrange(RIGHT, buff=0.22)
        plate = RoundedRectangle(width=row.width + 0.62, height=0.72, corner_radius=0.16, stroke_color="#D5A33B", stroke_width=2, fill_color=CREAM, fill_opacity=0.95).move_to(row)
        return VGroup(plate, row).move_to(LEFT * 2.40 + UP * 2.73).set_z_index(30)

    def finish(self, started, cue):
        duration = cue["beatEnd"] - cue["start"]
        remaining = max(0, duration - (self.time - started))
        while remaining > 2.8:
            replay_time = min(1.8, remaining - 1.0)
            if self.replay:
                self.replay(replay_time)
            else:
                self.play(Indicate(self.focus, color=GOLD, scale_factor=1.055), run_time=replay_time)
            remaining = max(0, duration - (self.time - started))
            if remaining > 2.8:
                self.wait(min(0.9, remaining - 2.5))
            remaining = max(0, duration - (self.time - started))
        if remaining > 0:
            self.wait(remaining)

    def sprite(self, name, height, point):
        return ImageMobject(str(self.assets / name)).set_height(height).move_to(point).set_z_index(8)

    def skaters(self, pose="contact", left_x=-3.0, right_x=0.2, y=-0.55, height=4.75):
        suffix = "contact" if pose == "contact" else "recoil"
        return (
            self.sprite(f"skater-a-{suffix}.png", height, [left_x, y, 0]),
            self.sprite(f"skater-b-{suffix}.png", height, [right_x, y, 0]),
        )

    def panel(self, title, labels, accent=COBALT):
        shell = RoundedRectangle(width=3.75, height=4.35, corner_radius=0.20, stroke_color=accent, stroke_width=2.5, fill_color="#FFFDF7", fill_opacity=0.96).move_to(RIGHT * 4.70 + DOWN * 0.18)
        heading = Text(title.upper(), font_size=21, weight=BOLD, color=INK)
        if heading.width > 3.15:
            heading.scale_to_fit_width(3.15)
        heading.move_to(shell.get_top() + DOWN * 0.45)
        rule = Line(LEFT * 1.45, RIGHT * 1.45, color="#D9CBA9", stroke_width=2).next_to(heading, DOWN, buff=0.15)
        rows = []
        y = shell.get_top()[1] - 1.20
        for label, color in labels:
            rows.append(self.status_row(label, color).move_to([shell.get_center()[0], y, 0]))
            y -= 0.78
        shell_group = VGroup(shell, heading, rule).set_z_index(20)
        for row in rows:
            row.set_z_index(21)
        return shell_group, rows

    def status_row(self, label, color):
        plate_width = 3.20
        dot = Circle(radius=0.15, stroke_width=0, fill_color=color, fill_opacity=1)
        text = Text(label, font_size=18, weight=BOLD, color=INK)
        if text.width > 2.42:
            text.scale_to_fit_width(2.42)
        row = VGroup(dot, text).arrange(RIGHT, buff=0.18)
        plate = RoundedRectangle(width=plate_width, height=0.60, corner_radius=0.13, stroke_color=color, stroke_width=2, fill_color=WHITE, fill_opacity=0.98).move_to(row)
        row.move_to(plate)
        return VGroup(plate, row).set_z_index(21)

    def tag(self, text, color=COBALT, width=None):
        label = Text(text, font_size=18, weight=BOLD, color=INK)
        plate_width = width or max(1.55, label.width + 0.46)
        if label.width > plate_width - 0.38:
            label.scale_to_fit_width(plate_width - 0.38)
        plate = RoundedRectangle(width=plate_width, height=0.52, corner_radius=0.12, stroke_color=color, stroke_width=2, fill_color=WHITE, fill_opacity=0.96).move_to(label)
        return VGroup(plate, label).set_z_index(20)

    def force_arrow(self, start, end, label, color, label_shift=UP * 0.36):
        arrow = Arrow(start, end, buff=0, color=color, stroke_width=8, max_tip_length_to_length_ratio=0.20)
        return VGroup(arrow, self.tag(label, color).scale(0.78).move_to(arrow.get_center() + label_shift))

    def dots(self, start, direction, count=4, spacing=0.42, color=CYAN, increasing=False):
        group = VGroup()
        offset = 0
        for index in range(count):
            offset += spacing * (0.55 + index * 0.35) if increasing else spacing
            group.add(Dot(start + direction * offset, radius=0.06, color=color, fill_opacity=0.88 - index * 0.12))
        return group

    def keep(self, *items):
        self.dynamic.extend(items)

    def reveal(self, rows, run_time=1.25):
        self.play(LaggedStart(*[FadeIn(row, shift=UP * 0.07) for row in rows], lag_ratio=0.25), run_time=run_time)

    def mystery(self):
        left, right = self.skaters("contact")
        shell, rows = self.panel("Observe the change", [("STILL", COBALT), ("PALMS TOUCH", GOLD), ("MOVE APART", GREEN)], GOLD)
        self.play(FadeIn(Group(left, right), shift=UP * 0.08), FadeIn(shell), run_time=0.60)
        self.play(FadeIn(rows[0]), run_time=0.38)
        self.play(left.animate.shift(RIGHT * 0.16), right.animate.shift(LEFT * 0.16), run_time=1.25, rate_func=smooth)
        contact = Circle(radius=0.24, color=GOLD, stroke_width=7).move_to(LEFT * 1.38 + UP * 0.42)
        self.play(Create(contact), Flash(contact.get_center(), color=GOLD, flash_radius=0.55), run_time=0.75)
        self.play(FadeIn(rows[1]), run_time=0.42)
        left_r, right_r = self.skaters("recoil", -3.05, 0.25)
        self.play(FadeTransform(left, left_r), FadeTransform(right, right_r), FadeOut(contact), run_time=0.62)
        trail_l = self.dots([-2.05, -1.75, 0], LEFT)
        trail_r = self.dots([-0.85, -1.75, 0], RIGHT)
        self.play(left_r.animate.shift(LEFT * 0.95), right_r.animate.shift(RIGHT * 0.95), LaggedStart(*[FadeIn(dot) for dot in [*trail_l, *trail_r]], lag_ratio=0.08), run_time=2.25, rate_func=rate_functions.ease_out_cubic)
        self.play(FadeIn(rows[2]), run_time=0.45)
        question = self.tag("WHERE IS THE PAIR?", ORANGE, 3.3).move_to(LEFT * 1.40 + DOWN * 2.55)
        self.play(FadeIn(question, shift=UP * 0.10), run_time=0.55)
        self.play(Circumscribe(left_r, color=COBALT), run_time=0.75)
        self.play(Circumscribe(right_r, color=GOLD), run_time=0.75)
        self.focus = Group(left_r, right_r, trail_l, trail_r)
        self.replay = lambda run_time: self.play(
            left_r.animate.shift(RIGHT * 0.50), right_r.animate.shift(LEFT * 0.50),
            run_time=run_time, rate_func=there_and_back,
        )
        self.keep(left_r, right_r, shell, *rows, trail_l, trail_r, question)

    def interaction(self):
        left, right = self.skaters("contact")
        shell, rows = self.panel("One interaction", [("SKATER A", COBALT), ("SKATER B", GOLD), ("TWO FORCES", GREEN)], ORANGE)
        self.play(FadeIn(Group(left, right)), FadeIn(shell), run_time=0.55)
        halo_a = Ellipse(width=2.15, height=4.25, color=COBALT, stroke_width=4).move_to(left)
        halo_b = Ellipse(width=2.15, height=4.25, color=GOLD, stroke_width=4).move_to(right)
        self.play(Create(halo_a), FadeIn(rows[0]), run_time=0.75)
        self.play(Create(halo_b), FadeIn(rows[1]), run_time=0.75)
        pulse = Circle(radius=0.22, color=ORANGE, stroke_width=7).move_to(LEFT * 1.38 + UP * 0.42)
        self.play(Create(pulse), Flash(pulse.get_center(), color=ORANGE, flash_radius=0.50), run_time=0.70)
        arrow_a = self.force_arrow([-2.40, -0.20, 0], [-3.70, -0.20, 0], "B ON A", COBALT)
        arrow_b = self.force_arrow([-0.35, -0.20, 0], [0.95, -0.20, 0], "A ON B", GOLD)
        self.play(GrowArrow(arrow_a[0]), GrowArrow(arrow_b[0]), run_time=0.85)
        self.play(FadeIn(arrow_a[1]), FadeIn(arrow_b[1]), run_time=0.55)
        self.play(left.animate.shift(RIGHT * 0.12), right.animate.shift(LEFT * 0.12), rate_func=there_and_back, run_time=1.20)
        self.play(FadeIn(rows[2]), run_time=0.45)
        equal = self.tag("EQUAL SIZE - DIFFERENT OBJECTS", GREEN, 4.35).move_to(LEFT * 1.38 + DOWN * 2.58)
        self.play(FadeIn(equal), run_time=0.55)
        self.play(Indicate(arrow_a, color=COBALT), Indicate(arrow_b, color=GOLD), run_time=1.05)
        self.focus = Group(left, right, arrow_a, arrow_b)
        self.replay = lambda run_time: self.play(
            left.animate.shift(LEFT * 0.58), arrow_a.animate.shift(LEFT * 0.58),
            right.animate.shift(RIGHT * 0.58), arrow_b.animate.shift(RIGHT * 0.58),
            run_time=run_time, rate_func=there_and_back,
        )
        self.keep(left, right, shell, *rows, halo_a, halo_b, pulse, arrow_a, arrow_b, equal)

    def arrows(self):
        left, right = self.skaters("recoil", -2.65, -0.15)
        shell, rows = self.panel("Read every arrow", [("FORCE ON A", COBALT), ("FORCE ON B", GOLD), ("OPPOSITE WAYS", GREEN)], COBALT)
        self.play(FadeIn(Group(left, right)), FadeIn(shell), run_time=0.55)
        arrow_a = self.force_arrow([-2.40, -0.10, 0], [-3.75, -0.10, 0], "B ON A", COBALT)
        arrow_b = self.force_arrow([-0.40, -0.10, 0], [0.95, -0.10, 0], "A ON B", GOLD)
        self.play(GrowArrow(arrow_a[0]), FadeIn(rows[0]), run_time=0.80)
        self.play(FadeIn(arrow_a[1]), run_time=0.35)
        self.play(GrowArrow(arrow_b[0]), FadeIn(rows[1]), run_time=0.80)
        self.play(FadeIn(arrow_b[1]), run_time=0.35)
        self.play(Group(left, arrow_a).animate.shift(LEFT * 0.85), Group(right, arrow_b).animate.shift(RIGHT * 0.85), run_time=2.20, rate_func=rate_functions.ease_out_cubic)
        self.play(FadeIn(rows[2]), run_time=0.45)
        axis = DoubleArrow(LEFT * 2.4, RIGHT * 2.4, buff=0, color=GREEN, stroke_width=4).move_to(LEFT * 1.40 + DOWN * 2.60)
        self.play(Create(axis), run_time=0.75)
        self.play(Indicate(arrow_a, color=COBALT), Indicate(arrow_b, color=GOLD), run_time=1.10)
        self.focus = Group(left, right, arrow_a, arrow_b, axis)
        self.replay = lambda run_time: self.play(
            left.animate.shift(RIGHT * 0.80), arrow_a.animate.shift(RIGHT * 0.80),
            right.animate.shift(LEFT * 0.80), arrow_b.animate.shift(LEFT * 0.80),
            run_time=run_time, rate_func=there_and_back,
        )
        self.keep(left, right, shell, *rows, arrow_a, arrow_b, axis)

    def motion_evidence(self):
        ghost_l, ghost_r = self.skaters("contact", -2.80, -0.05)
        ghost_l.set_opacity(0.18)
        ghost_r.set_opacity(0.18)
        left, right = self.skaters("recoil", -2.80, -0.05)
        shell, rows = self.panel("Before and after", [("BEFORE: STILL", COBALT), ("AFTER: MOVING", ORANGE), ("CHANGE = EVIDENCE", GREEN)], GREEN)
        ruler = NumberLine(x_range=[0, 6, 1], length=6.8, include_numbers=False, color=MUTED, stroke_width=3).move_to(LEFT * 1.55 + DOWN * 2.25)
        self.play(FadeIn(Group(ghost_l, ghost_r)), FadeIn(shell), Create(ruler), run_time=0.70)
        self.play(FadeIn(rows[0]), run_time=0.40)
        self.play(FadeIn(Group(left, right)), run_time=0.45)
        self.play(left.animate.shift(LEFT * 1.25), right.animate.shift(RIGHT * 1.25), run_time=2.65, rate_func=rate_functions.ease_out_cubic)
        self.play(FadeIn(rows[1]), run_time=0.42)
        end_l = DashedLine(UP * 0.35, DOWN * 0.35, color=ORANGE).move_to([-4.05, -2.25, 0])
        end_r = DashedLine(UP * 0.35, DOWN * 0.35, color=ORANGE).move_to([1.20, -2.25, 0])
        self.play(Create(end_l), Create(end_r), run_time=0.65)
        self.play(left.animate.shift(RIGHT * 0.45), right.animate.shift(LEFT * 0.45), run_time=1.15, rate_func=there_and_back)
        self.play(FadeIn(rows[2]), run_time=0.45)
        stamp = self.tag("MOTION CHANGED", GREEN, 2.85).move_to(LEFT * 1.45 + DOWN * 2.85)
        self.play(FadeIn(stamp, scale=0.92), Circumscribe(stamp, color=GREEN), run_time=0.90)
        self.focus = Group(ghost_l, ghost_r, left, right, ruler, end_l, end_r)
        self.keep(ghost_l, ghost_r, left, right, shell, *rows, ruler, end_l, end_r, stamp)

    def push_ended(self):
        left, right = self.skaters("contact")
        shell, rows = self.panel("Track the contact", [("TOUCHING", GOLD), ("HANDS APART", COBALT), ("PUSH ENDED", RED)], RED)
        self.play(FadeIn(Group(left, right)), FadeIn(shell), FadeIn(rows[0]), run_time=0.60)
        arrow_a = Arrow([-1.62, 0.34, 0], [-2.72, 0.34, 0], buff=0, color=COBALT, stroke_width=8)
        arrow_b = Arrow([-1.15, 0.34, 0], [-0.05, 0.34, 0], buff=0, color=GOLD, stroke_width=8)
        self.play(GrowArrow(arrow_a), GrowArrow(arrow_b), run_time=0.78)
        self.play(left.animate.shift(RIGHT * 0.12), right.animate.shift(LEFT * 0.12), rate_func=there_and_back, run_time=1.05)
        left_r, right_r = self.skaters("recoil", -3.05, 0.25)
        self.play(FadeTransform(left, left_r), FadeTransform(right, right_r), Uncreate(arrow_a), Uncreate(arrow_b), FadeIn(rows[1]), run_time=0.80)
        dots_l = self.dots([-2.15, -1.72, 0], LEFT, count=5, spacing=0.38)
        dots_r = self.dots([-0.75, -1.72, 0], RIGHT, count=5, spacing=0.38)
        self.play(left_r.animate.shift(LEFT * 1.05), right_r.animate.shift(RIGHT * 1.05), LaggedStart(*[FadeIn(dot) for dot in [*dots_l, *dots_r]], lag_ratio=0.07), run_time=2.55, rate_func=linear)
        self.play(FadeIn(rows[2]), run_time=0.42)
        note = self.tag("LOW-FRICTION TRACK: STEADY GLIDE", CYAN, 4.10).move_to(LEFT * 1.42 + DOWN * 2.62)
        self.play(FadeIn(note), run_time=0.55)
        self.play(Indicate(dots_l, color=CYAN), Indicate(dots_r, color=CYAN), run_time=0.95)
        self.focus = Group(left_r, right_r, dots_l, dots_r)
        self.replay = lambda run_time: self.play(
            left_r.animate.shift(LEFT * 0.35), right_r.animate.shift(RIGHT * 0.35),
            run_time=run_time, rate_func=there_and_back,
        )
        self.keep(left_r, right_r, shell, *rows, dots_l, dots_r, note)

    def push_pull(self):
        shell, rows = self.panel("Contact forces", [("HAND + CART", ORANGE), ("ROPE + TROLLEY", COBALT), ("NAME BOTH", GREEN)], ORANGE)
        push = self.sprite("push-cart.png", 2.60, [-2.55, -0.35, 0])
        self.play(FadeIn(push), FadeIn(shell), run_time=0.55)
        push_arrow = self.force_arrow([-3.35, 1.45, 0], [-1.65, 1.45, 0], "PUSH", ORANGE)
        self.play(GrowArrow(push_arrow[0]), FadeIn(push_arrow[1]), FadeIn(rows[0]), run_time=0.85)
        self.play(push.animate.shift(RIGHT * 2.15), push_arrow.animate.shift(RIGHT * 1.25), run_time=2.25, rate_func=rate_functions.ease_out_cubic)
        ring = Circle(radius=0.22, color=ORANGE, stroke_width=6).move_to([-2.45, 0.00, 0])
        self.play(Create(ring), Flash(ring.get_center(), color=ORANGE), run_time=0.65)
        pull = self.sprite("pull-trolley.png", 2.55, [-2.40, -0.35, 0])
        self.play(FadeOut(Group(push, push_arrow, ring), shift=RIGHT * 0.22), FadeIn(pull, shift=LEFT * 0.18), run_time=0.55)
        pull_arrow = self.force_arrow([-3.15, 1.42, 0], [-1.45, 1.42, 0], "PULL", COBALT)
        self.play(GrowArrow(pull_arrow[0]), FadeIn(pull_arrow[1]), FadeIn(rows[1]), run_time=0.85)
        self.play(pull.animate.shift(RIGHT * 2.15), pull_arrow.animate.shift(RIGHT * 1.35), run_time=2.25, rate_func=rate_functions.ease_out_cubic)
        self.play(FadeIn(rows[2]), run_time=0.45)
        self.focus = Group(pull, pull_arrow)
        def replay_pull(run_time):
            reset_time = min(0.42, run_time * 0.28)
            self.play(pull.animate.shift(LEFT * 0.95), pull_arrow.animate.shift(LEFT * 0.95), run_time=reset_time)
            self.play(
                pull.animate.shift(RIGHT * 0.95), pull_arrow.animate.shift(RIGHT * 0.95),
                run_time=max(0.45, run_time - reset_time), rate_func=rate_functions.ease_out_cubic,
            )
        self.replay = replay_pull
        self.keep(shell, *rows, pull, pull_arrow)

    def non_contact(self):
        shell, rows = self.panel("No touch required", [("AIR GAP", CYAN), ("MOTION CHANGES", GREEN), ("EARTH ON BOOK", VIOLET)], MAGENTA)
        left = self.sprite("magnet-cart-left.png", 1.72, [-3.30, -0.55, 0])
        right = self.sprite("magnet-cart-right.png", 1.72, [-0.25, -0.55, 0])
        self.play(FadeIn(Group(left, right)), FadeIn(shell), run_time=0.55)
        gap = DoubleArrow([-2.35, 0.05, 0], [-1.22, 0.05, 0], buff=0, color=CYAN, stroke_width=5)
        self.play(Create(gap), FadeIn(rows[0]), run_time=0.70)
        force_l = Arrow([-2.80, 0.72, 0], [-4.00, 0.72, 0], buff=0, color=MAGENTA, stroke_width=7)
        force_r = Arrow([-0.75, 0.72, 0], [0.45, 0.72, 0], buff=0, color=MAGENTA, stroke_width=7)
        self.play(GrowArrow(force_l), GrowArrow(force_r), run_time=0.75)
        self.play(left.animate.shift(LEFT * 1.00), right.animate.shift(RIGHT * 1.00), run_time=2.20, rate_func=rate_functions.ease_out_cubic)
        self.play(FadeIn(rows[1]), run_time=0.38)
        self.play(FadeOut(Group(left, right, gap, force_l, force_r)), run_time=0.50)
        book = self.sprite("book.png", 1.25, [-1.75, 1.85, 0])
        earth = self.tag("EARTH", VIOLET, 1.60).move_to([-1.75, -2.20, 0])
        gravity = self.force_arrow([-1.75, 1.25, 0], [-1.75, 0.05, 0], "EARTH ON BOOK", VIOLET, RIGHT * 1.05)
        dots = self.dots([-1.75, 1.30, 0], DOWN, count=4, spacing=0.38, color=VIOLET, increasing=True)
        self.play(FadeIn(book), FadeIn(earth), GrowArrow(gravity[0]), FadeIn(gravity[1]), run_time=0.80)
        self.play(book.animate.shift(DOWN * 3.15).rotate(-0.16), LaggedStart(*[FadeIn(dot) for dot in dots], lag_ratio=0.18), run_time=2.45, rate_func=rate_functions.ease_in_cubic)
        self.play(FadeIn(rows[2]), run_time=0.42)
        self.focus = Group(book, gravity, dots)
        self.keep(shell, *rows, book, earth, gravity, dots)

    def classification(self):
        shell, rows = self.panel("Two questions", [("NAME BOTH", COBALT), ("TOUCHING?", ORANGE), ("MOTION CHANGE?", GREEN)], COBALT)
        self.play(FadeIn(shell), LaggedStart(*[FadeIn(row) for row in rows], lag_ratio=0.20), run_time=1.15)
        label = self.tag("CONTACT", ORANGE, 2.15).move_to(LEFT * 1.60 + DOWN * 2.55)
        foot_ball = self.sprite("foot-ball.png", 2.55, [-2.35, -0.35, 0])
        self.play(FadeIn(foot_ball), FadeIn(label), run_time=0.55)
        self.play(foot_ball.animate.shift(RIGHT * 1.15), run_time=1.55, rate_func=rate_functions.ease_out_cubic)
        self.play(Indicate(label, color=ORANGE), run_time=0.60)
        left = self.sprite("magnet-cart-left.png", 1.55, [-3.20, -0.55, 0])
        right = self.sprite("magnet-cart-right.png", 1.55, [-0.55, -0.55, 0])
        no_touch = self.tag("NO TOUCH", MAGENTA, 2.15).move_to(label)
        self.play(FadeOut(foot_ball), FadeTransform(label, no_touch), FadeIn(Group(left, right)), run_time=0.58)
        self.play(left.animate.shift(LEFT * 0.75), right.animate.shift(RIGHT * 0.75), run_time=1.60, rate_func=rate_functions.ease_out_cubic)
        self.play(Indicate(no_touch, color=MAGENTA), run_time=0.60)
        book = self.sprite("book.png", 1.20, [-1.75, 1.55, 0])
        earth_label = self.tag("EARTH + BOOK", VIOLET, 2.35).move_to(no_touch)
        self.play(FadeOut(Group(left, right)), FadeTransform(no_touch, earth_label), FadeIn(book), run_time=0.58)
        gravity = Arrow([-1.75, 0.90, 0], [-1.75, -0.35, 0], buff=0, color=VIOLET, stroke_width=8)
        self.play(GrowArrow(gravity), book.animate.shift(DOWN * 2.85), run_time=2.15, rate_func=rate_functions.ease_in_cubic)
        answer = self.tag("NON-CONTACT", VIOLET, 2.55).move_to(LEFT * 1.60 + DOWN * 2.55)
        self.play(FadeTransform(earth_label, answer), run_time=0.55)
        self.focus = Group(book, gravity)
        def replay_fall(run_time):
            reset_time = min(0.40, run_time * 0.28)
            self.play(book.animate.shift(UP * 1.45), gravity.animate.shift(UP * 1.45), run_time=reset_time)
            self.play(
                book.animate.shift(DOWN * 1.45), gravity.animate.shift(DOWN * 1.45),
                run_time=max(0.45, run_time - reset_time), rate_func=rate_functions.ease_in_cubic,
            )
        self.replay = replay_fall
        self.keep(shell, *rows, gravity, book, answer)

    def fair_test(self):
        shell, rows = self.panel("Fair test", [("SAME CART", COBALT), ("SAME TRACK", COBALT), ("CHANGE PUSH", ORANGE)], GREEN)
        self.play(FadeIn(shell), LaggedStart(*[FadeIn(row) for row in rows], lag_ratio=0.20), run_time=1.20)
        top_track = Line([-5.15, 0.70, 0], [1.80, 0.70, 0], color=MUTED, stroke_width=5)
        bottom_track = Line([-5.15, -1.30, 0], [1.80, -1.30, 0], color=MUTED, stroke_width=5)
        cart_top = self.sprite("magnet-cart-left.png", 1.05, [-4.45, 1.02, 0])
        cart_bottom = self.sprite("magnet-cart-left.png", 1.05, [-4.45, -0.98, 0])
        self.play(Create(top_track), Create(bottom_track), FadeIn(Group(cart_top, cart_bottom)), run_time=0.80)
        small_force = Arrow([-5.10, 1.65, 0], [-4.15, 1.65, 0], buff=0, color=ORANGE, stroke_width=7)
        big_force = Arrow([-5.10, -0.35, 0], [-3.45, -0.35, 0], buff=0, color=ORANGE, stroke_width=7)
        self.play(GrowArrow(small_force), GrowArrow(big_force), run_time=0.72)
        self.play(cart_top.animate.shift(RIGHT * 2.45), cart_bottom.animate.shift(RIGHT * 4.05), run_time=2.70, rate_func=rate_functions.ease_out_cubic)
        mark_top = DashedLine(UP * 0.36, DOWN * 0.36, color=GOLD).move_to([-2.00, 0.70, 0])
        mark_bottom = DashedLine(UP * 0.36, DOWN * 0.36, color=GREEN).move_to([-0.40, -1.30, 0])
        self.play(Create(mark_top), Create(mark_bottom), run_time=0.62)
        compare = self.tag("BIGGER PUSH - LONGER DISTANCE", GREEN, 4.35).move_to(LEFT * 1.52 + DOWN * 2.58)
        self.play(FadeIn(compare), run_time=0.52)
        self.play(Indicate(rows[0], color=COBALT), Indicate(rows[1], color=COBALT), run_time=0.90)
        self.focus = Group(cart_top, cart_bottom, small_force, big_force, mark_top, mark_bottom)
        def replay_fair_test(run_time):
            reset_time = min(0.42, run_time * 0.28)
            self.play(
                cart_top.animate.shift(LEFT * 1.25), cart_bottom.animate.shift(LEFT * 2.05),
                run_time=reset_time,
            )
            self.play(
                cart_top.animate.shift(RIGHT * 1.25), cart_bottom.animate.shift(RIGHT * 2.05),
                run_time=max(0.45, run_time - reset_time), rate_func=rate_functions.ease_out_cubic,
            )
        self.replay = replay_fair_test
        self.keep(shell, *rows, top_track, bottom_track, cart_top, cart_bottom, small_force, big_force, mark_top, mark_bottom, compare)

    def repair(self):
        shell, rows = self.panel("Repair the idea", [("FOOT + BALL", ORANGE), ("CONTACT ENDS", RED), ("BALL ROLLS ON", GREEN)], RED)
        wrong = self.tag("FORCE HIDES INSIDE?", RED, 3.25).move_to(LEFT * 1.55 + UP * 1.95)
        contact = self.sprite("foot-ball.png", 2.55, [-2.35, -0.35, 0])
        self.play(FadeIn(contact), FadeIn(shell), FadeIn(wrong), run_time=0.60)
        strike = Cross(wrong, stroke_color=RED, stroke_width=6)
        self.play(Create(strike), run_time=0.62)
        contact_arrow = self.force_arrow([-3.70, 1.00, 0], [-2.20, 1.00, 0], "FOOT ON BALL", ORANGE)
        self.play(GrowArrow(contact_arrow[0]), FadeIn(contact_arrow[1]), FadeIn(rows[0]), run_time=0.85)
        ball = self.sprite("ball.png", 1.40, [-1.70, -0.45, 0])
        self.play(FadeOut(contact), FadeIn(ball), FadeOut(contact_arrow), FadeIn(rows[1]), run_time=0.68)
        trail = self.dots([-2.10, -0.50, 0], LEFT, count=5, spacing=0.40)
        self.play(ball.animate.shift(RIGHT * 3.25).rotate(-PI * 1.35), LaggedStart(*[FadeIn(dot) for dot in trail], lag_ratio=0.10), run_time=2.65, rate_func=linear)
        self.play(FadeIn(rows[2]), run_time=0.42)
        fixed = self.tag("INTERACTION, THEN MOTION", GREEN, 3.70).move_to(LEFT * 1.55 + DOWN * 2.58)
        self.play(FadeOut(Group(wrong, strike)), FadeIn(fixed), run_time=0.62)
        self.play(Indicate(trail, color=CYAN), run_time=0.85)
        self.focus = Group(ball, trail)
        def replay_roll(run_time):
            reset_time = min(0.42, run_time * 0.28)
            self.play(ball.animate.shift(LEFT * 2.65).rotate(PI * 0.85), run_time=reset_time)
            self.play(
                ball.animate.shift(RIGHT * 2.65).rotate(-PI * 0.85),
                run_time=max(0.45, run_time - reset_time), rate_func=linear,
            )
        self.replay = replay_roll
        self.keep(shell, *rows, ball, trail, fixed)

    def predict(self):
        shell, rows = self.panel("Predict the evidence", [("GAP VISIBLE", CYAN), ("CARTS MOVE", GREEN), ("NO HAND", ORANGE)], MAGENTA)
        left = self.sprite("magnet-cart-left.png", 1.75, [-3.25, -0.50, 0])
        right = self.sprite("magnet-cart-right.png", 1.75, [-0.25, -0.50, 0])
        predict = self.tag("PREDICT", GOLD, 1.90).move_to(LEFT * 1.75 + UP * 1.65)
        gap = DoubleArrow([-2.33, 0.08, 0], [-1.23, 0.08, 0], buff=0, color=CYAN, stroke_width=5)
        self.play(FadeIn(Group(left, right)), FadeIn(shell), FadeIn(predict), Create(gap), run_time=0.70)
        self.play(Indicate(predict, color=GOLD), run_time=0.85)
        self.wait(1.35)
        force_l = Arrow([-2.75, 0.75, 0], [-4.05, 0.75, 0], buff=0, color=MAGENTA, stroke_width=8)
        force_r = Arrow([-0.75, 0.75, 0], [0.55, 0.75, 0], buff=0, color=MAGENTA, stroke_width=8)
        self.play(GrowArrow(force_l), GrowArrow(force_r), run_time=0.72)
        self.play(left.animate.shift(LEFT * 1.05), right.animate.shift(RIGHT * 1.05), run_time=2.35, rate_func=rate_functions.ease_out_cubic)
        self.reveal(rows, 1.65)
        claim = self.tag("CLAIM SUPPORTED", GREEN, 2.80).move_to(LEFT * 1.70 + DOWN * 2.48)
        self.play(FadeIn(claim, scale=0.92), Circumscribe(claim, color=GREEN), run_time=0.85)
        self.focus = Group(left, right, gap, force_l, force_r)
        self.replay = lambda run_time: self.play(
            left.animate.shift(RIGHT * 0.62), right.animate.shift(LEFT * 0.62),
            run_time=run_time, rate_func=there_and_back,
        )
        self.keep(shell, *rows, left, right, predict, gap, force_l, force_r, claim)

    def exit_scene(self):
        left, right = self.skaters("contact", -3.10, 0.10)
        shell, rows = self.panel("Your physics move", [("1  NAME THE PAIR", COBALT), ("2  TOUCH OR NO TOUCH", ORANGE), ("3  USE MOTION EVIDENCE", GREEN)], GOLD)
        self.play(FadeIn(Group(left, right)), FadeIn(shell), run_time=0.60)
        self.play(FadeIn(rows[0]), Circumscribe(Group(left, right), color=COBALT), run_time=0.90)
        touch = Circle(radius=0.24, color=ORANGE, stroke_width=7).move_to(LEFT * 1.48 + UP * 0.42)
        self.play(Create(touch), FadeIn(rows[1]), run_time=0.80)
        arrow_a = Arrow([-1.78, 0.34, 0], [-2.88, 0.34, 0], buff=0, color=COBALT, stroke_width=8)
        arrow_b = Arrow([-1.18, 0.34, 0], [-0.08, 0.34, 0], buff=0, color=GOLD, stroke_width=8)
        self.play(GrowArrow(arrow_a), GrowArrow(arrow_b), run_time=0.75)
        left_r, right_r = self.skaters("recoil", -3.10, 0.10)
        self.play(
            FadeTransform(left, left_r), FadeTransform(right, right_r),
            FadeOut(touch), FadeOut(arrow_a), FadeOut(arrow_b), run_time=0.62,
        )
        dots_l = self.dots([-2.15, -1.72, 0], LEFT, count=4, spacing=0.38)
        dots_r = self.dots([-0.75, -1.72, 0], RIGHT, count=4, spacing=0.38)
        self.play(left_r.animate.shift(LEFT * 0.90), right_r.animate.shift(RIGHT * 0.90), FadeIn(rows[2]), run_time=2.25, rate_func=rate_functions.ease_out_cubic)
        self.play(LaggedStart(*[FadeIn(dot) for dot in [*dots_l, *dots_r]], lag_ratio=0.08), run_time=0.62)
        ready = self.tag("COCKPIT CHECK READY", GREEN, 3.45).move_to(LEFT * 1.50 + DOWN * 2.58)
        glow = SurroundingRectangle(ready, color=GREEN, buff=0.12, corner_radius=0.16, stroke_width=5)
        self.play(FadeIn(ready), Create(glow), run_time=0.75)
        self.play(Indicate(ready, color=GREEN, scale_factor=1.035), run_time=0.95)
        self.focus = Group(left_r, right_r, dots_l, dots_r)
        self.replay = lambda run_time: self.play(
            left_r.animate.shift(RIGHT * 0.45), right_r.animate.shift(LEFT * 0.45),
            run_time=run_time, rate_func=there_and_back,
        )
        self.keep(shell, *rows, left_r, right_r, dots_l, dots_r, ready, glow)
