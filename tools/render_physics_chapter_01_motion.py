import json
import math
import os
from pathlib import Path

from manim import *


INK = "#071827"
NAVY = "#0A2944"
COBALT = "#1265C9"
BLUE = "#13B9E8"
ORANGE = "#FF8A1F"
GOLD = "#FFC857"
GREEN = "#32D296"
RED = "#FF5A59"
WHITE = "#FFFFFF"
SOFT = "#EAF5FF"
BLACK = "#030A10"


class PhysicsChapter01Motion(Scene):
    def construct(self):
        self.course_dir = Path(os.environ["BQ_PHYSICS_COURSE_DIR"])
        self.timeline = json.loads(Path(os.environ["BQ_TIMELINE_PATH"]).read_text(encoding="utf-8"))
        self.assets = self.course_dir / "assets" / "source" / "kinetic-lab-v3"
        self.dynamic = []
        self.focus = None
        self.minimum_hold = 0
        self.background = self.image("lab-stage-clean.png", width=config.frame_width * 1.035, point=ORIGIN, z=-100)
        self.header_group = self.header()
        self.add(self.background, self.header_group)
        self.wait(0.25)

        handlers = [
            self.mystery,
            self.interaction,
            self.arrows,
            self.motion_evidence,
            self.push_ended,
            self.push_pull,
            self.non_contact,
            self.classification,
            self.fair_test,
            self.repair,
            self.predict,
            self.exit_scene,
        ]
        for index, cue in enumerate(self.timeline["cues"]):
            started = self.time
            self.transition(index, cue["title"])
            handlers[index]()
            self.finish(started, cue)
        if self.time < self.timeline["duration"]:
            self.wait(self.timeline["duration"] - self.time)

    def image(self, name, height=None, width=None, point=ORIGIN, z=8):
        mob = ImageMobject(str(self.assets / name))
        if width:
            mob.set_width(width)
        elif height:
            mob.set_height(height)
        return mob.move_to(point).set_z_index(z)

    def header(self):
        rail = Rectangle(width=config.frame_width, height=0.54, stroke_width=0, fill_color=INK, fill_opacity=0.96).to_edge(UP, buff=0)
        brand = Text("BRIGHT QUEST  /  PHYSICS 101", font_size=17, weight=BOLD, color=WHITE).to_edge(LEFT, buff=0.38).shift(UP * 3.34)
        chapter = Text("FORCE LAB 01", font_size=17, weight=BOLD, color=GOLD).to_edge(RIGHT, buff=0.38).shift(UP * 3.34)
        return VGroup(rail, brand, chapter).set_z_index(80)

    def transition(self, index, title):
        heading = self.heading(index, title)
        previous_layers = [
            item for item in list(self.mobjects)
            if item is not self.background and item is not self.header_group
        ]
        fades = [FadeOut(item, shift=DOWN * 0.05) for item in previous_layers]
        drift = LEFT * 0.08 if index % 2 else RIGHT * 0.08
        self.play(
            AnimationGroup(*fades, FadeIn(heading, shift=RIGHT * 0.12), lag_ratio=0),
            self.background.animate.shift(drift).scale(1.002),
            run_time=0.45 if index else 0.34,
        )
        for item in list(self.mobjects):
            if item is not self.background and item is not self.header_group and item is not heading:
                self.remove(item)
        self.dynamic = [heading]
        self.focus = heading
        self.minimum_hold = 0

    def heading(self, index, title):
        number = Text(f"{index + 1:02d}", font_size=18, weight=BOLD, color=INK)
        badge = RoundedRectangle(width=0.68, height=0.46, corner_radius=0.12, stroke_width=0, fill_color=ORANGE, fill_opacity=1).move_to(number)
        label = Text(title.upper(), font_size=21, weight=BOLD, color=WHITE)
        if label.width > 5.8:
            label.scale_to_fit_width(5.8)
        row = VGroup(VGroup(badge, number), label).arrange(RIGHT, buff=0.20)
        shell = RoundedRectangle(width=row.width + 0.58, height=0.66, corner_radius=0.16, stroke_color=WHITE, stroke_width=1.5, fill_color=INK, fill_opacity=0.88).move_to(row)
        return VGroup(shell, row).move_to(LEFT * 3.40 + UP * 2.80).set_z_index(50)

    def chip(self, text, accent=BLUE, width=None, point=ORIGIN, size=18):
        label = Text(text.upper(), font_size=size, weight=BOLD, color=WHITE)
        plate_width = width or max(1.5, label.width + 0.52)
        if label.width > plate_width - 0.42:
            label.scale_to_fit_width(plate_width - 0.42)
        plate = RoundedRectangle(width=plate_width, height=0.56, corner_radius=0.14, stroke_color=accent, stroke_width=2.3, fill_color=BLACK, fill_opacity=0.86).move_to(label)
        return VGroup(plate, label).move_to(point).set_z_index(45)

    def chips(self, items, y=-2.86):
        group = VGroup(*[self.chip(text, colour, width) for text, colour, width in items]).arrange(RIGHT, buff=0.16).move_to([0, y, 0])
        return group

    def cue_arrow(self, start, end, label=None, colour=WHITE, label_shift=UP * 0.38):
        arrow = Arrow(start, end, buff=0, color=colour, stroke_width=8, max_tip_length_to_length_ratio=0.18)
        arrow.set_background_stroke(color=BLACK, width=13, opacity=0.94).set_z_index(34)
        if not label:
            return arrow
        tag = self.chip(label, colour, width=2.12, size=15).move_to(arrow.get_center() + label_shift)
        return VGroup(arrow, tag)

    def contact_ring(self, point, radius=0.22):
        core = Circle(radius=radius, color=WHITE, stroke_width=7).move_to(point)
        core.set_background_stroke(color=BLACK, width=12, opacity=0.9)
        halo = Circle(radius=radius * 1.75, color=ORANGE, stroke_width=4).move_to(point)
        return VGroup(core, halo).set_z_index(36)

    def lab_sweep(self):
        bands = VGroup(
            Rectangle(width=0.92, height=5.82, stroke_width=0, fill_color=BLUE, fill_opacity=0.060),
            Rectangle(width=0.42, height=5.82, stroke_width=0, fill_color=WHITE, fill_opacity=0.180),
            Rectangle(width=0.92, height=5.82, stroke_width=0, fill_color=BLUE, fill_opacity=0.060),
        ).arrange(RIGHT, buff=-0.04)
        return bands.rotate(-0.10).move_to([-6.65, -0.12, 0]).set_z_index(5)

    def trail(self, start, direction, colour, count=5):
        group = VGroup()
        for index in range(count):
            line = Line(start + direction * (index * 0.34), start + direction * (0.18 + index * 0.34), color=colour, stroke_width=max(2, 7 - index))
            line.set_background_stroke(color=BLACK, width=max(5, 11 - index), opacity=0.55)
            group.add(line.set_z_index(30))
        return group

    def pilots(self, left_x=-2.70, right_x=2.62, y=-0.22, height=5.42):
        left = self.image("pilot-blue-contact.png", height=height, point=[left_x, y, 0], z=12)
        right = self.image("pilot-orange-contact.png", height=height, point=[right_x, y, 0], z=12)
        return left, right

    def magnets(self, left_x=-2.15, right_x=2.05, y=-0.58, height=2.65):
        left = self.image("magnet-cart-orange.png", height=height, point=[left_x, y, 0], z=12)
        right = self.image("magnet-cart-cyan.png", height=height, point=[right_x, y, 0], z=12)
        return left, right

    def keep(self, *items):
        self.dynamic.extend(items)

    def finish(self, started, cue):
        duration = cue["beatEnd"] - cue["start"]
        remaining = max(0, duration - (self.time - started))
        while remaining > 1.15:
            sweep = self.lab_sweep()
            self.add(sweep)
            sweep_time = min(1.25, remaining)
            self.play(sweep.animate.shift(RIGHT * 13.30), run_time=sweep_time, rate_func=linear)
            self.remove(sweep)
            remaining = max(0, duration - (self.time - started))
            quiet_hold = min(2.20, max(0, remaining - 1.15))
            if quiet_hold > 0:
                self.wait(quiet_hold)
            remaining = max(0, duration - (self.time - started))
        if remaining > 0:
            self.wait(remaining)

    def mystery(self):
        left, right = self.pilots(-2.95, 2.90)
        states = self.chips([("still", BLUE, 1.65), ("palms touch", ORANGE, 2.25), ("motion changes", GREEN, 2.55)])
        self.play(FadeIn(Group(left, right), shift=UP * 0.08, scale=0.96), FadeIn(states[0]), run_time=0.80)
        self.play(left.animate.shift(RIGHT * 0.26), right.animate.shift(LEFT * 0.26), run_time=1.20, rate_func=rate_functions.ease_in_out_sine)
        contact = self.contact_ring([0.02, 0.58, 0])
        self.play(Create(contact), Flash(contact.get_center(), color=GOLD, flash_radius=0.62), FadeIn(states[1]), run_time=0.78)
        trails = VGroup(self.trail([-1.65, -1.54, 0], LEFT, BLUE), self.trail([1.64, -1.54, 0], RIGHT, ORANGE))
        self.play(FadeOut(contact, scale=1.35), left.animate.shift(LEFT * 1.05), right.animate.shift(RIGHT * 1.05), LaggedStart(*[Create(line) for line in trails], lag_ratio=0.05), run_time=2.50, rate_func=rate_functions.ease_out_cubic)
        self.play(FadeIn(states[2]), run_time=0.44)
        question = self.chip("Which two objects interact?", GOLD, width=4.10, point=[0, 2.00, 0], size=17)
        self.play(FadeIn(question, shift=DOWN * 0.08), run_time=0.55)
        self.minimum_hold = 2.8
        self.focus = Group(left, right)
        self.keep(left, right, states, trails, question)

    def interaction(self):
        left, right = self.pilots(-2.76, 2.72)
        self.play(FadeIn(Group(left, right)), run_time=0.58)
        outline_l = SurroundingRectangle(left, color=BLUE, buff=0.02, corner_radius=0.18, stroke_width=4)
        outline_r = SurroundingRectangle(right, color=ORANGE, buff=0.02, corner_radius=0.18, stroke_width=4)
        self.play(Create(outline_l), run_time=0.62)
        self.play(Create(outline_r), run_time=0.62)
        contact = self.contact_ring([0, 0.58, 0])
        self.play(Create(contact), run_time=0.48)
        force_l = self.cue_arrow([-0.20, 0.38, 0], [-2.10, 0.38, 0], "ORANGE ON BLUE", BLUE)
        force_r = self.cue_arrow([0.20, 0.38, 0], [2.10, 0.38, 0], "BLUE ON ORANGE", ORANGE)
        self.play(GrowArrow(force_l[0]), FadeIn(force_l[1]), run_time=0.82)
        self.play(GrowArrow(force_r[0]), FadeIn(force_r[1]), run_time=0.82)
        principle = self.chip("one interaction  •  two forces", GREEN, width=4.60, point=[0, -2.82, 0], size=17)
        self.play(FadeIn(principle), left.animate.shift(LEFT * 0.30), right.animate.shift(RIGHT * 0.30), run_time=1.05)
        self.focus = Group(force_l, force_r)
        self.keep(left, right, outline_l, outline_r, contact, force_l, force_r, principle)

    def arrows(self):
        left, right = self.pilots(-3.05, 3.02, height=5.12)
        self.play(FadeIn(Group(left, right)), run_time=0.55)
        force_l = self.cue_arrow([-0.18, 0.40, 0], [-2.35, 0.40, 0], "ON BLUE", BLUE)
        force_r = self.cue_arrow([0.18, 0.40, 0], [2.35, 0.40, 0], "ON ORANGE", ORANGE)
        self.play(GrowArrow(force_l[0]), FadeIn(force_l[1]), run_time=0.82)
        self.play(Circumscribe(left, color=BLUE), run_time=0.70)
        self.play(GrowArrow(force_r[0]), FadeIn(force_r[1]), run_time=0.82)
        self.play(Circumscribe(right, color=ORANGE), run_time=0.70)
        measure = DoubleArrow([-2.30, -2.20, 0], [2.30, -2.20, 0], color=WHITE, stroke_width=5)
        measure.set_background_stroke(color=BLACK, width=10, opacity=0.9)
        rule = self.chip("equal length  •  opposite direction", GOLD, width=4.75, point=[0, -2.80, 0], size=17)
        self.play(Create(measure), FadeIn(rule), run_time=0.82)
        self.focus = Group(force_l, force_r, measure)
        self.keep(left, right, force_l, force_r, measure, rule)

    def motion_evidence(self):
        ghost_l, ghost_r = self.pilots(-2.72, 2.67, height=5.05)
        ghost_l.set_opacity(0.20)
        ghost_r.set_opacity(0.20)
        left, right = self.pilots(-2.72, 2.67, height=5.05)
        before = self.chip("before: still", BLUE, width=2.30, point=[-3.90, 1.85, 0])
        after = self.chip("after: moving", ORANGE, width=2.55, point=[3.80, 1.85, 0])
        self.play(FadeIn(Group(ghost_l, ghost_r)), FadeIn(before), run_time=0.66)
        self.play(FadeIn(Group(left, right)), run_time=0.42)
        self.play(left.animate.shift(LEFT * 1.00), right.animate.shift(RIGHT * 1.00), FadeIn(after), run_time=2.35, rate_func=rate_functions.ease_out_cubic)
        track = Line([-4.95, -2.30, 0], [4.95, -2.30, 0], color=WHITE, stroke_width=5)
        track.set_background_stroke(color=BLACK, width=10, opacity=0.65)
        markers = VGroup(*[Line([x, -2.47, 0], [x, -2.13, 0], color=GOLD, stroke_width=4) for x in [-3.75, -2.70, 2.65, 3.70]])
        claim = self.chip("change in motion = evidence", GREEN, width=4.20, point=[0, -2.82, 0], size=17)
        self.play(Create(track), LaggedStart(*[Create(mark) for mark in markers], lag_ratio=0.12), FadeIn(claim), run_time=0.95)
        self.focus = Group(left, right, markers)
        self.keep(ghost_l, ghost_r, left, right, before, after, track, markers, claim)

    def push_ended(self):
        left, right = self.pilots(-2.76, 2.72, height=5.12)
        contact = self.contact_ring([0, 0.58, 0])
        arrows = VGroup(self.cue_arrow([-0.18, 0.32, 0], [-1.72, 0.32, 0]), self.cue_arrow([0.18, 0.32, 0], [1.72, 0.32, 0]))
        self.play(FadeIn(Group(left, right)), Create(contact), run_time=0.62)
        self.play(GrowArrow(arrows[0]), GrowArrow(arrows[1]), run_time=0.78)
        ended = self.chip("contact push", ORANGE, width=2.22, point=[0, 1.72, 0])
        self.play(FadeIn(ended), run_time=0.42)
        continue_tag = self.chip("motion continues", GREEN, width=2.60, point=[0, -2.82, 0])
        self.play(FadeOut(Group(contact, arrows, ended)), left.animate.shift(LEFT * 1.12), right.animate.shift(RIGHT * 1.12), FadeIn(continue_tag), run_time=2.45, rate_func=linear)
        no_force = self.chip("that contact has ended", RED, width=3.18, point=[0, 1.72, 0], size=17)
        self.play(FadeIn(no_force), run_time=0.48)
        self.focus = Group(left, right)
        self.keep(left, right, continue_tag, no_force)

    def push_pull(self):
        push = self.image("robot-push-cart.png", height=4.75, point=[-1.25, -0.35, 0], z=12)
        push_tag = self.chip("push: hand + cart", ORANGE, width=3.18, point=[0, 1.94, 0], size=17)
        self.play(FadeIn(push, shift=LEFT * 0.14), FadeIn(push_tag), run_time=0.64)
        contact = self.contact_ring([-0.10, 0.34, 0], radius=0.17)
        self.play(Create(contact), Flash(contact.get_center(), color=ORANGE, flash_radius=0.45), run_time=0.62)
        self.play(push.animate.shift(RIGHT * 2.10), run_time=2.20, rate_func=rate_functions.ease_out_cubic)
        pull = self.image("robot-pull-trolley.png", height=4.65, point=[0.20, -0.28, 0], z=12)
        pull_tag = self.chip("pull: cable + trolley", BLUE, width=3.42, point=[0, 1.94, 0], size=17)
        self.play(FadeOut(Group(push, push_tag, contact), shift=RIGHT * 0.16), FadeIn(pull, shift=LEFT * 0.16), FadeIn(pull_tag), run_time=0.62)
        self.play(pull.animate.shift(RIGHT * 1.85), run_time=2.18, rate_func=rate_functions.ease_out_cubic)
        pair = self.chip("name both objects", GREEN, width=2.75, point=[0, -2.82, 0])
        self.play(FadeIn(pair), run_time=0.45)
        self.focus = pull
        self.keep(pull, pull_tag, pair)

    def non_contact(self):
        left, right = self.magnets(-2.25, 2.18)
        gap = DoubleArrow([-0.68, 0.20, 0], [0.64, 0.20, 0], color=WHITE, stroke_width=5)
        gap.set_background_stroke(color=BLACK, width=10, opacity=0.9)
        gap_tag = self.chip("air gap", BLUE, width=1.62, point=[0, 1.35, 0])
        self.play(FadeIn(Group(left, right)), Create(gap), FadeIn(gap_tag), run_time=0.78)
        self.wait(0.90)
        arrows = VGroup(self.cue_arrow([-1.35, 0.92, 0], [-3.20, 0.92, 0], colour=ORANGE), self.cue_arrow([1.35, 0.92, 0], [3.20, 0.92, 0], colour=BLUE))
        self.play(GrowArrow(arrows[0]), GrowArrow(arrows[1]), run_time=0.82)
        self.play(left.animate.shift(LEFT * 1.12), right.animate.shift(RIGHT * 1.12), run_time=2.25, rate_func=rate_functions.ease_out_cubic)
        evidence = self.chips([("no touch", BLUE, 1.78), ("motion changes", GREEN, 2.48), ("non-contact", ORANGE, 2.15)])
        self.play(LaggedStart(*[FadeIn(item, shift=UP * 0.05) for item in evidence], lag_ratio=0.20), run_time=1.05)
        self.focus = Group(left, right, gap)
        self.keep(left, right, gap, gap_tag, arrows, evidence)

    def classification(self):
        question = self.chip("1  name both objects     2  do they touch?", GOLD, width=6.15, point=[0, 1.92, 0], size=18)
        self.play(FadeIn(question), run_time=0.52)
        push = self.image("robot-push-cart.png", height=3.55, point=[-2.70, -0.40, 0], z=12)
        contact = self.chip("contact", ORANGE, width=1.80, point=[-2.55, -2.45, 0])
        self.play(FadeIn(push), FadeIn(contact), run_time=0.68)
        magnets = self.image("magnet-carts.png", height=2.45, point=[2.55, -0.40, 0], z=12)
        noncontact = self.chip("non-contact", BLUE, width=2.25, point=[2.55, -2.45, 0])
        self.play(FadeIn(magnets), FadeIn(noncontact), run_time=0.68)
        self.play(Indicate(push, color=ORANGE, scale_factor=1.02), run_time=0.75)
        self.play(Indicate(magnets, color=BLUE, scale_factor=1.02), run_time=0.75)
        rule = self.chip("touching chooses the label", GREEN, width=3.70, point=[0, -2.88, 0], size=17)
        self.play(FadeIn(rule), run_time=0.48)
        self.focus = Group(contact, noncontact)
        self.keep(question, push, contact, magnets, noncontact, rule)

    def fair_test(self):
        top_track = Line([-5.15, 0.55, 0], [5.05, 0.55, 0], color=WHITE, stroke_width=5).set_background_stroke(color=BLACK, width=10, opacity=0.55)
        bottom_track = Line([-5.15, -1.48, 0], [5.05, -1.48, 0], color=WHITE, stroke_width=5).set_background_stroke(color=BLACK, width=10, opacity=0.55)
        cart_a = self.image("magnet-cart-orange.png", height=1.55, point=[-4.15, 0.92, 0], z=12)
        cart_b = self.image("magnet-cart-orange.png", height=1.55, point=[-4.15, -1.11, 0], z=12)
        start = DashedLine([-4.15, 1.55, 0], [-4.15, -2.08, 0], color=GOLD, stroke_width=5)
        same = self.chip("same cart  •  same track  •  same start", BLUE, width=5.35, point=[0, 1.95, 0], size=17)
        self.play(Create(top_track), Create(bottom_track), FadeIn(Group(cart_a, cart_b)), Create(start), FadeIn(same), run_time=0.90)
        small = self.cue_arrow([-5.20, 1.58, 0], [-4.42, 1.58, 0], colour=ORANGE)
        large = self.cue_arrow([-5.20, -0.45, 0], [-3.62, -0.45, 0], colour=ORANGE)
        self.play(GrowArrow(small), GrowArrow(large), run_time=0.72)
        self.play(cart_a.animate.shift(RIGHT * 2.55), cart_b.animate.shift(RIGHT * 4.25), run_time=2.65, rate_func=rate_functions.ease_out_cubic)
        result = self.chip("change only the push", GREEN, width=3.15, point=[0, -2.82, 0], size=17)
        self.play(FadeIn(result), run_time=0.48)
        self.focus = Group(cart_a, cart_b)
        self.keep(top_track, bottom_track, cart_a, cart_b, start, same, small, large, result)

    def repair(self):
        left, right = self.pilots(-2.76, 2.72, height=5.08)
        stored = self.chip("is the push stored inside?", RED, width=3.65, point=[0, 1.88, 0], size=17)
        self.play(FadeIn(Group(left, right)), FadeIn(stored), run_time=0.62)
        contact = self.contact_ring([0, 0.58, 0])
        arrows = VGroup(self.cue_arrow([-0.18, 0.36, 0], [-1.70, 0.36, 0]), self.cue_arrow([0.18, 0.36, 0], [1.70, 0.36, 0]))
        self.play(Create(contact), GrowArrow(arrows[0]), GrowArrow(arrows[1]), run_time=0.80)
        first = self.chip("interaction first", ORANGE, width=2.52, point=[-1.48, -2.82, 0])
        later = self.chip("motion afterwards", GREEN, width=2.82, point=[1.55, -2.82, 0])
        self.play(FadeIn(first), run_time=0.42)
        self.play(FadeOut(Group(contact, arrows, stored)), left.animate.shift(LEFT * 1.10), right.animate.shift(RIGHT * 1.10), FadeIn(later), run_time=2.35, rate_func=linear)
        answer = self.chip("no stored push", BLUE, width=2.35, point=[0, 1.88, 0])
        self.play(FadeIn(answer), run_time=0.48)
        self.focus = Group(left, right)
        self.keep(left, right, first, later, answer)

    def predict(self):
        left, right = self.magnets(-2.20, 2.12, height=2.75)
        prompt = self.chip("predict the evidence", GOLD, width=3.10, point=[0, 1.78, 0], size=18)
        gap = DoubleArrow([-0.70, 0.17, 0], [0.66, 0.17, 0], color=WHITE, stroke_width=5).set_background_stroke(color=BLACK, width=10, opacity=0.9)
        self.play(FadeIn(Group(left, right)), FadeIn(prompt), Create(gap), run_time=0.72)
        clock = VGroup(*[Arc(radius=0.42, start_angle=PI / 2, angle=-TAU * (index + 1) / 3, color=GOLD, stroke_width=6) for index in range(3)]).move_to([0, 0.92, 0])
        for arc in clock:
            self.play(Create(arc), run_time=0.88)
        arrows = VGroup(self.cue_arrow([-1.35, 0.90, 0], [-3.25, 0.90, 0], colour=ORANGE), self.cue_arrow([1.35, 0.90, 0], [3.25, 0.90, 0], colour=BLUE))
        self.play(FadeOut(clock), GrowArrow(arrows[0]), GrowArrow(arrows[1]), run_time=0.78)
        self.play(left.animate.shift(LEFT * 1.10), right.animate.shift(RIGHT * 1.10), run_time=2.25, rate_func=rate_functions.ease_out_cubic)
        evidence = self.chips([("gap visible", BLUE, 2.08), ("both move", GREEN, 1.88), ("no hand", ORANGE, 1.72)])
        self.play(LaggedStart(*[FadeIn(item) for item in evidence], lag_ratio=0.20), run_time=1.05)
        self.minimum_hold = 2.8
        self.focus = Group(left, right, gap)
        self.keep(left, right, prompt, gap, arrows, evidence)

    def exit_scene(self):
        hero = self.image("selected-visual-target.png", width=config.frame_width * 1.02, point=[0, -0.02, 0], z=-20)
        shade = Rectangle(width=config.frame_width, height=config.frame_height, stroke_width=0, fill_color=INK, fill_opacity=0.18).set_z_index(-10)
        self.play(FadeIn(hero), FadeIn(shade), run_time=0.72)
        routine = self.chip("THE PHYSICIST'S ROUTINE", GOLD, width=4.05, point=[0, 2.05, 0], size=19)
        steps = self.chips([("1  name the pair", BLUE, 2.45), ("2  touch?", ORANGE, 1.78), ("3  use motion", GREEN, 2.25)], y=-2.62)
        self.play(FadeIn(routine, shift=DOWN * 0.08), run_time=0.50)
        self.play(LaggedStart(*[FadeIn(step, shift=UP * 0.08) for step in steps], lag_ratio=0.28), hero.animate.scale(1.025), run_time=1.65)
        conclusion = self.chip("a force belongs to an interaction", WHITE, width=4.78, point=[0, -3.18, 0], size=17)
        self.play(FadeIn(conclusion), run_time=0.52)
        self.focus = steps
        self.keep(hero, shade, routine, steps, conclusion)
