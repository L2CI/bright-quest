import json
import os
from pathlib import Path

from manim import *


INK = "#071827"
NAVY = "#0A2944"
BLUE = "#13B9E8"
COBALT = "#1265C9"
ORANGE = "#FF8A1F"
GOLD = "#FFC857"
GREEN = "#32D296"
RED = "#FF5A59"
VIOLET = "#8D6BFF"
WHITE = "#FFFFFF"
SOFT = "#EAF5FF"
BLACK = "#030A10"


class PhysicsChapter01VoiceDirected(Scene):
    def construct(self):
        self.course_dir = Path(os.environ["BQ_PHYSICS_COURSE_DIR"])
        self.timeline = json.loads(Path(os.environ["BQ_TIMELINE_PATH"]).read_text(encoding="utf-8"))
        self.captions = {int(cue["index"]): cue for cue in self.timeline["captionCues"]}
        self.assets = self.course_dir / "assets" / "source" / "kinetic-lab-v3"
        self.dynamic = []
        self.background = self.image("lab-stage-clean.png", width=config.frame_width * 1.035, point=ORIGIN, z=-100)
        self.background_shade = Rectangle(
            width=config.frame_width,
            height=config.frame_height,
            stroke_width=0,
            fill_color=INK,
            fill_opacity=0.10,
        ).set_z_index(-90)
        self.header_group = self.header()
        self.add(self.background, self.background_shade, self.header_group)

        self.mystery()
        self.interaction()
        self.arrows()
        self.motion_evidence()
        self.push_ended()
        self.push_pull()
        self.non_contact()
        self.classification()
        self.fair_test()
        self.repair()
        self.predict()
        self.exit_scene()
        self.wait_until(self.timeline["duration"])

    def cstart(self, index, lead=0):
        return max(0, self.captions[index]["start"] - lead)

    def cend(self, index):
        return self.captions[index]["end"]

    def wait_until(self, target):
        remaining = target - self.time
        if remaining > 0.001:
            self.wait(remaining)

    def play_at(self, target, *animations, run_time=0.55, rate_func=smooth):
        self.wait_until(target)
        self.play(*animations, run_time=run_time, rate_func=rate_func)

    def image(self, name, height=None, width=None, point=ORIGIN, z=8):
        mob = ImageMobject(str(self.assets / name))
        if width:
            mob.set_width(width)
        elif height:
            mob.set_height(height)
        return mob.move_to(point).set_z_index(z)

    def header(self):
        rail = Rectangle(width=config.frame_width, height=0.54, stroke_width=0, fill_color=INK, fill_opacity=0.98).to_edge(UP, buff=0)
        brand = Text("BRIGHT QUEST  /  PHYSICS 101", font_size=17, weight=BOLD, color=WHITE).to_edge(LEFT, buff=0.38).shift(UP * 3.34)
        mission = Text("FORCE LAB  //  MISSION 01", font_size=17, weight=BOLD, color=GOLD).to_edge(RIGHT, buff=0.38).shift(UP * 3.34)
        return VGroup(rail, brand, mission).set_z_index(90)

    def start_scene(self, number, caption_index, title, accent=ORANGE):
        start = self.cstart(caption_index)
        self.wait_until(start)
        previous = [
            item for item in list(self.mobjects)
            if item not in [self.background, self.background_shade, self.header_group]
        ]
        if previous:
            self.play(FadeOut(Group(*previous), shift=DOWN * 0.04), run_time=0.24)
        heading = self.heading(number, title, accent)
        self.play(FadeIn(heading, shift=RIGHT * 0.10), run_time=0.28)
        self.dynamic = [heading]
        return heading

    def heading(self, number, title, accent=ORANGE):
        number_text = Text(f"{number:02d}", font_size=18, weight=BOLD, color=INK)
        badge = RoundedRectangle(width=0.70, height=0.48, corner_radius=0.12, stroke_width=0, fill_color=accent, fill_opacity=1).move_to(number_text)
        label = Text(title.upper(), font_size=22, weight=BOLD, color=WHITE)
        if label.width > 5.65:
            label.scale_to_fit_width(5.65)
        row = VGroup(VGroup(badge, number_text), label).arrange(RIGHT, buff=0.20)
        shell = RoundedRectangle(width=row.width + 0.58, height=0.72, corner_radius=0.16, stroke_color=WHITE, stroke_width=1.6, fill_color=INK, fill_opacity=0.94).move_to(row)
        pips = VGroup(*[
            Circle(radius=0.045, stroke_width=0, fill_color=(accent if index < number else WHITE), fill_opacity=(1 if index < number else 0.22))
            for index in range(12)
        ]).arrange(RIGHT, buff=0.07).next_to(shell, DOWN, buff=0.09).align_to(shell, LEFT)
        return VGroup(shell, row, pips).move_to(LEFT * 3.28 + UP * 2.68).set_z_index(70)

    def chip(self, text, accent=BLUE, width=None, point=ORIGIN, size=21, fill=BLACK):
        label = Text(text.upper(), font_size=size, weight=BOLD, color=WHITE)
        plate_width = width or max(1.65, label.width + 0.56)
        if label.width > plate_width - 0.42:
            label.scale_to_fit_width(plate_width - 0.42)
        plate = RoundedRectangle(
            width=plate_width,
            height=0.62,
            corner_radius=0.15,
            stroke_color=accent,
            stroke_width=2.6,
            fill_color=fill,
            fill_opacity=0.91,
        ).move_to(label)
        glow = RoundedRectangle(
            width=plate_width + 0.08,
            height=0.70,
            corner_radius=0.18,
            stroke_color=accent,
            stroke_width=7,
            stroke_opacity=0.16,
        ).move_to(label)
        return VGroup(glow, plate, label).move_to(point).set_z_index(52)

    def panel(self, title, accent, width=4.0, height=2.5, point=ORIGIN):
        shell = RoundedRectangle(
            width=width,
            height=height,
            corner_radius=0.20,
            stroke_color=accent,
            stroke_width=2.4,
            fill_color=INK,
            fill_opacity=0.76,
        )
        edge = Line(shell.get_corner(UL) + RIGHT * 0.18, shell.get_corner(UR) + LEFT * 0.18, color=accent, stroke_width=7)
        label = Text(title.upper(), font_size=19, weight=BOLD, color=WHITE).next_to(edge, DOWN, buff=0.13).align_to(shell, LEFT).shift(RIGHT * 0.25)
        return VGroup(shell, edge, label).move_to(point).set_z_index(30)

    def target_box(self, target, accent=GOLD, buff=0.06):
        outer = SurroundingRectangle(target, color=accent, buff=buff, corner_radius=0.16, stroke_width=4)
        inner = SurroundingRectangle(target, color=WHITE, buff=buff + 0.05, corner_radius=0.19, stroke_width=1.5, stroke_opacity=0.72)
        return VGroup(outer, inner).set_z_index(48)

    def contact_ring(self, point, radius=0.23):
        core = Circle(radius=radius, color=WHITE, stroke_width=6).move_to(point)
        halo = Circle(radius=radius * 1.72, color=ORANGE, stroke_width=4).move_to(point)
        rays = VGroup(*[
            Line(point + rotate_vector(RIGHT * radius * 2.0, angle), point + rotate_vector(RIGHT * radius * 2.65, angle), color=GOLD, stroke_width=3)
            for angle in [0, PI / 2, PI, 3 * PI / 2]
        ])
        return VGroup(core, halo, rays).set_z_index(50)

    def force_arrow(self, start, end, label, accent, label_shift=UP * 0.40):
        glow = Arrow(start, end, buff=0, color=accent, stroke_width=15, stroke_opacity=0.18, max_tip_length_to_length_ratio=0.18)
        arrow = Arrow(start, end, buff=0, color=accent, stroke_width=8, max_tip_length_to_length_ratio=0.18)
        arrow.set_background_stroke(color=BLACK, width=13, opacity=0.94)
        tag = self.chip(label, accent, width=2.55, size=16).move_to(arrow.get_center() + label_shift)
        return VGroup(glow, arrow, tag).set_z_index(46)

    def evidence_stamp(self, text, point, accent=GREEN, width=2.65):
        circle = Circle(radius=0.21, stroke_color=accent, stroke_width=4, fill_color=accent, fill_opacity=0.18)
        tick = VGroup(
            Line([-0.11, 0.00, 0], [-0.02, -0.10, 0], color=WHITE, stroke_width=5),
            Line([-0.02, -0.10, 0], [0.14, 0.11, 0], color=WHITE, stroke_width=5),
        ).move_to(circle)
        label = self.chip(text, accent, width=width, size=18)
        return VGroup(VGroup(circle, tick), label).arrange(RIGHT, buff=0.13).move_to(point).set_z_index(54)

    def warning_stamp(self, text, point, width=3.1):
        triangle = Triangle(color=ORANGE, stroke_width=4, fill_color=ORANGE, fill_opacity=0.18).scale(0.27)
        mark = Text("!", font_size=22, weight=BOLD, color=WHITE).move_to(triangle)
        return VGroup(VGroup(triangle, mark), self.chip(text, ORANGE, width=width, size=17)).arrange(RIGHT, buff=0.12).move_to(point).set_z_index(54)

    def trail(self, start, direction, accent, count=6):
        group = VGroup()
        for index in range(count):
            offset = direction * (index * 0.30)
            line = Line(start + offset, start + offset + direction * 0.17, color=accent, stroke_width=max(2, 8 - index))
            line.set_background_stroke(color=BLACK, width=max(5, 12 - index), opacity=0.50)
            group.add(line)
        return group.set_z_index(38)

    def pilots(self, left_x=-2.72, right_x=2.68, y=-0.18, height=5.18):
        return (
            self.image("pilot-blue-contact.png", height=height, point=[left_x, y, 0], z=15),
            self.image("pilot-orange-contact.png", height=height, point=[right_x, y, 0], z=15),
        )

    def magnets(self, left_x=-2.18, right_x=2.12, y=-0.52, height=2.55):
        return (
            self.image("magnet-cart-orange.png", height=height, point=[left_x, y, 0], z=15),
            self.image("magnet-cart-cyan.png", height=height, point=[right_x, y, 0], z=15),
        )

    def pole_badge(self, text, point, accent=RED):
        disc = Circle(radius=0.28, stroke_color=WHITE, stroke_width=2, fill_color=accent, fill_opacity=1)
        label = Text(text, font_size=22, weight=BOLD, color=WHITE).move_to(disc)
        return VGroup(disc, label).move_to(point).set_z_index(55)

    def lock_badge(self, text, point, accent=BLUE):
        body = RoundedRectangle(width=0.28, height=0.24, corner_radius=0.05, fill_color=accent, fill_opacity=1, stroke_width=0)
        shackle = Arc(radius=0.14, start_angle=0, angle=PI, color=WHITE, stroke_width=4).rotate(PI).next_to(body, UP, buff=-0.05)
        icon = VGroup(body, shackle)
        label = self.chip(text, accent, width=1.75, size=16)
        return VGroup(icon, label).arrange(RIGHT, buff=0.10).move_to(point).set_z_index(55)

    def cross_mark(self, target, accent=RED):
        box = SurroundingRectangle(target, buff=0.10)
        return VGroup(
            Line(box.get_corner(UL), box.get_corner(DR), color=accent, stroke_width=8),
            Line(box.get_corner(UR), box.get_corner(DL), color=accent, stroke_width=8),
        ).set_z_index(60)

    def earth_vignette(self, point=ORIGIN, scale=1.0):
        earth = Circle(radius=0.92 * scale, stroke_color=BLUE, stroke_width=5, fill_color=NAVY, fill_opacity=1)
        land = VGroup(
            Ellipse(width=0.58, height=0.30, fill_color=GREEN, fill_opacity=0.86, stroke_width=0).rotate(0.30).shift(LEFT * 0.25 + UP * 0.22),
            Ellipse(width=0.46, height=0.24, fill_color=GREEN, fill_opacity=0.86, stroke_width=0).rotate(-0.45).shift(RIGHT * 0.30 + DOWN * 0.24),
        ).scale(scale).move_to(earth)
        glow = Circle(radius=1.02 * scale, stroke_color=BLUE, stroke_width=10, stroke_opacity=0.20).move_to(earth)
        globe = VGroup(glow, earth, land).move_to(point + DOWN * 0.52)
        obj = RoundedRectangle(width=0.62 * scale, height=0.38 * scale, corner_radius=0.08, stroke_color=GOLD, stroke_width=3, fill_color=ORANGE, fill_opacity=0.85).move_to(point + UP * 1.34)
        gap = DashedLine(globe.get_top() + UP * 0.10, obj.get_bottom() + DOWN * 0.08, color=WHITE, stroke_width=3, dash_length=0.10)
        gravity = self.force_arrow(obj.get_center(), obj.get_center() + DOWN * 0.90, "EARTH ON OBJECT", VIOLET, label_shift=RIGHT * 1.25)
        return Group(globe, obj, gap, gravity)

    def mystery(self):
        heading = self.start_scene(1, 1, "Watch the motion")
        left, right = self.pilots(-2.82, 2.78)
        still = self.chip("Both platforms still", BLUE, width=3.25, point=[0, -2.77, 0], size=18)
        self.play_at(self.cstart(1) + 0.30, FadeIn(Group(left, right), shift=UP * 0.08), run_time=0.62)
        boxes = VGroup(self.target_box(left, BLUE), self.target_box(right, ORANGE))
        self.play_at(self.cstart(2), FadeIn(still), Create(boxes), run_time=0.55)
        hands = self.contact_ring([0.02, 0.55, 0])
        hand_tag = self.chip("Watch the hands", GOLD, width=2.55, point=[0, 1.62, 0], size=18)
        self.play_at(self.cstart(3), FadeIn(hand_tag), Create(hands), run_time=0.52)
        trails = VGroup(self.trail([-1.66, -1.45, 0], LEFT, BLUE), self.trail([1.65, -1.45, 0], RIGHT, ORANGE))
        self.play_at(self.cstart(4) + 0.25, FadeOut(boxes), left.animate.shift(LEFT * 1.00), right.animate.shift(RIGHT * 1.00), FadeIn(trails), run_time=2.65, rate_func=rate_functions.ease_out_cubic)
        clue = self.evidence_stamp("Motion changed", [0, -2.74, 0], GREEN, 2.48)
        ghosts = Group(left.copy().set_opacity(0.18).shift(RIGHT * 1.00), right.copy().set_opacity(0.18).shift(LEFT * 1.00))
        self.play_at(self.cstart(5), FadeOut(still), FadeIn(ghosts), FadeIn(clue), run_time=0.52)
        question = self.chip("Which two objects interact?", GOLD, width=4.25, point=[0, 1.84, 0], size=19)
        pair_boxes = VGroup(self.target_box(left, BLUE), self.target_box(right, ORANGE))
        self.play_at(self.cstart(6), FadeOut(hand_tag), FadeOut(hands), FadeIn(question), Create(pair_boxes), run_time=0.58)
        self.dynamic = [heading, left, right, trails, clue, ghosts, question, pair_boxes]

    def interaction(self):
        heading = self.start_scene(2, 7, "A force needs two")
        left, right = self.pilots(-2.78, 2.73)
        definition = self.chip("Force = push or pull in an interaction", GOLD, width=5.25, point=[0, 1.78, 0], size=18)
        self.play_at(self.cstart(7) + 0.28, FadeIn(Group(left, right)), FadeIn(definition), run_time=0.60)
        contact = self.contact_ring([0, 0.56, 0])
        right_force = self.force_arrow([0.22, 0.34, 0], [2.15, 0.34, 0], "BLUE ON ORANGE", ORANGE)
        left_force = self.force_arrow([-0.22, 0.34, 0], [-2.15, 0.34, 0], "ORANGE ON BLUE", BLUE)
        orange_box = self.target_box(right, ORANGE)
        blue_box = self.target_box(left, BLUE)
        self.play_at(self.cstart(8), Create(contact), GrowArrow(right_force[1]), FadeIn(right_force[0]), FadeIn(right_force[2]), Create(orange_box), run_time=0.72)
        self.play_at(self.cstart(9), GrowArrow(left_force[1]), FadeIn(left_force[0]), FadeIn(left_force[2]), Create(blue_box), run_time=0.72)
        hub = Circle(radius=0.34, stroke_color=GOLD, stroke_width=4, fill_color=INK, fill_opacity=0.90).move_to([0, -1.48, 0])
        hub_text = Text("1", font_size=25, weight=BOLD, color=GOLD).move_to(hub)
        two = self.chip("2 forces", GREEN, width=1.72, point=[0, -2.60, 0], size=19)
        connectors = VGroup(Line(hub.get_center(), [-1.0, -0.72, 0], color=GOLD, stroke_width=4), Line(hub.get_center(), [1.0, -0.72, 0], color=GOLD, stroke_width=4))
        self.play_at(self.cstart(10), FadeOut(definition), Create(connectors), FadeIn(VGroup(hub, hub_text)), FadeIn(two), run_time=0.72)
        receivers = self.evidence_stamp("Two receiving objects", [0, -2.62, 0], GREEN, 3.05)
        self.play_at(self.cstart(11), FadeOut(two), FadeIn(receivers), Indicate(Group(left, right), color=GOLD, scale_factor=1.015), run_time=0.55)
        self.dynamic = [heading, left, right, contact, right_force, left_force, orange_box, blue_box, connectors, hub, hub_text, receivers]

    def arrows(self):
        heading = self.start_scene(3, 12, "Name both objects")
        left, right = self.pilots(-3.02, 2.98, height=5.05)
        left_force = self.force_arrow([-0.20, 0.36, 0], [-2.28, 0.36, 0], "ORANGE ON BLUE", BLUE)
        right_force = self.force_arrow([0.20, 0.36, 0], [2.28, 0.36, 0], "BLUE ON ORANGE", ORANGE)
        self.play_at(self.cstart(12) + 0.24, FadeIn(Group(left, right)), FadeIn(left_force), FadeIn(right_force), run_time=0.62)
        tracer = Dot(radius=0.09, color=GOLD).move_to(right_force[1].get_start()).set_z_index(58)
        self.play_at(self.cstart(12) + 1.1, FadeIn(tracer), MoveAlongPath(tracer, right_force[1]), run_time=1.15, rate_func=linear)
        orange_focus = self.target_box(right, ORANGE)
        self.play_at(self.cstart(13), FadeOut(tracer), Create(orange_focus), right_force.animate.set_opacity(1), left_force.animate.set_opacity(0.42), run_time=0.55)
        blue_focus = self.target_box(left, BLUE)
        self.play_at(self.cstart(14), FadeOut(orange_focus), Create(blue_focus), left_force.animate.set_opacity(1), right_force.animate.set_opacity(0.42), run_time=0.55)
        baseline = DoubleArrow([-2.28, -2.12, 0], [2.28, -2.12, 0], color=WHITE, stroke_width=5)
        length = self.chip("Equal length", GOLD, width=2.08, point=[-1.18, -2.70, 0], size=18)
        opposite = self.chip("Opposite direction", VIOLET, width=2.75, point=[1.55, -2.70, 0], size=18)
        self.play_at(self.cstart(15), FadeOut(blue_focus), left_force.animate.set_opacity(1), right_force.animate.set_opacity(1), Create(baseline), FadeIn(length), run_time=0.62)
        self.play_at(self.cstart(16), FadeIn(opposite), Wiggle(Group(left_force[1], right_force[1]), scale_value=1.01), run_time=0.56)
        resolved = self.evidence_stamp("One interaction / two forces", [0, -2.73, 0], GREEN, 3.65)
        self.play_at(self.cstart(17), FadeOut(length), FadeOut(opposite), FadeOut(baseline), FadeIn(resolved), run_time=0.48)
        self.dynamic = [heading, left, right, left_force, right_force, resolved]

    def motion_evidence(self):
        heading = self.start_scene(4, 18, "Motion is evidence")
        before_panel = self.panel("Before", BLUE, 5.0, 4.45, [-2.70, -0.25, 0])
        after_panel = self.panel("After", ORANGE, 5.0, 4.45, [2.70, -0.25, 0])
        before_l, before_r = self.pilots(-4.00, -1.38, y=-0.35, height=3.58)
        after_l, after_r = self.pilots(1.38, 4.00, y=-0.35, height=3.58)
        before_group = Group(before_l, before_r)
        after_group = Group(after_l, after_r)
        self.play_at(self.cstart(18) + 0.25, FadeIn(VGroup(before_panel, after_panel)), FadeIn(before_group), run_time=0.62)
        still = self.chip("Still", BLUE, width=1.55, point=[-2.70, -2.26, 0], size=19)
        self.play_at(self.cstart(19), Create(self.target_box(before_group, BLUE)), FadeIn(still), run_time=0.52)
        self.play_at(self.cstart(20), FadeIn(after_group), after_l.animate.shift(LEFT * 0.62), after_r.animate.shift(RIGHT * 0.62), run_time=1.50, rate_func=rate_functions.ease_out_cubic)
        moving = self.chip("Moving apart", ORANGE, width=2.25, point=[2.70, -2.26, 0], size=18)
        evidence = self.evidence_stamp("Change in motion", [0, -2.80, 0], GREEN, 2.65)
        self.play_at(self.cstart(21), FadeIn(moving), FadeIn(evidence), run_time=0.48)
        floating = VGroup(Circle(radius=0.38, color=VIOLET, stroke_width=5), Text("FORCE?", font_size=16, weight=BOLD, color=WHITE)).move_to([0, 0.10, 0])
        crossed = self.cross_mark(floating)
        self.play_at(self.cstart(22), FadeIn(floating), Create(crossed), run_time=0.55)
        measure = DoubleArrow([-4.60, -1.82, 0], [4.60, -1.82, 0], color=GOLD, stroke_width=5)
        rule = self.chip("Identify interaction  ->  measure change", GREEN, width=5.15, point=[0, 1.88, 0], size=18)
        self.play_at(self.cstart(23), FadeOut(floating), FadeOut(crossed), Create(measure), FadeIn(rule), run_time=0.62)
        self.dynamic = [heading, before_panel, after_panel, before_group, after_group, still, moving, evidence, measure, rule]

    def push_ended(self):
        heading = self.start_scene(5, 24, "The push has ended", RED)
        left, right = self.pilots(-2.78, 2.73, height=5.02)
        idea = self.chip("Is a push stored inside?", RED, width=3.55, point=[0, 1.82, 0], size=19)
        self.play_at(self.cstart(24) + 0.24, FadeIn(Group(left, right)), FadeIn(idea), run_time=0.58)
        capsule_l = Circle(radius=0.28, color=VIOLET, stroke_width=4).move_to(left.get_center() + UP * 0.45)
        capsule_r = Circle(radius=0.28, color=VIOLET, stroke_width=4).move_to(right.get_center() + UP * 0.45)
        self.play_at(self.cstart(25), FadeIn(VGroup(capsule_l, capsule_r)), run_time=0.45)
        rail = Line([-3.70, -2.43, 0], [3.70, -2.43, 0], color=WHITE, stroke_width=4)
        nodes = VGroup(*[Circle(radius=0.11, fill_color=color, fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to([x, -2.43, 0]) for x, color in [(-2.7, ORANGE), (0, GOLD), (2.7, GREEN)]])
        labels = VGroup(Text("TOUCH", font_size=16, weight=BOLD, color=ORANGE), Text("SEPARATE", font_size=16, weight=BOLD, color=GOLD), Text("GLIDE", font_size=16, weight=BOLD, color=GREEN))
        for label, node in zip(labels, nodes):
            label.next_to(node, UP, buff=0.10)
        self.play_at(self.cstart(26), Create(rail), FadeIn(nodes), FadeIn(labels), run_time=0.62)
        contact = self.contact_ring([0, 0.54, 0])
        force_pair = VGroup(
            self.force_arrow([-0.20, 0.32, 0], [-1.72, 0.32, 0], "ON BLUE", BLUE),
            self.force_arrow([0.20, 0.32, 0], [1.72, 0.32, 0], "ON ORANGE", ORANGE),
        )
        present = self.chip("Contact forces present", ORANGE, width=3.25, point=[0, 1.70, 0], size=18)
        self.play_at(self.cstart(27), FadeOut(idea), FadeOut(VGroup(capsule_l, capsule_r)), Create(contact), FadeIn(force_pair), FadeIn(present), run_time=0.65)
        trails = VGroup(self.trail([-1.68, -1.42, 0], LEFT, BLUE), self.trail([1.67, -1.42, 0], RIGHT, ORANGE))
        self.play_at(self.cstart(28), FadeOut(contact), FadeOut(force_pair), FadeOut(present), left.animate.shift(LEFT * 1.05), right.animate.shift(RIGHT * 1.05), FadeIn(trails), run_time=1.75, rate_func=rate_functions.ease_out_cubic)
        ended = self.evidence_stamp("Contact ended / motion continues", [0, 1.74, 0], GREEN, 4.05)
        self.play_at(self.cstart(29), FadeIn(ended), Indicate(nodes[2], color=GREEN, scale_factor=1.5), run_time=0.55)
        self.dynamic = [heading, left, right, trails, rail, nodes, labels, ended]

    def push_pull(self):
        heading = self.start_scene(6, 30, "Push or pull")
        push_label = self.chip("Push", ORANGE, width=1.55, point=[-2.65, 1.80, 0], size=21)
        pull_label = self.chip("Pull", BLUE, width=1.55, point=[2.65, 1.80, 0], size=21)
        divider = Line([0, -2.34, 0], [0, 1.52, 0], color=WHITE, stroke_width=2, stroke_opacity=0.55)
        self.play_at(self.cstart(30) + 0.26, FadeIn(VGroup(push_label, pull_label)), Create(divider), run_time=0.52)
        push = self.image("robot-push-cart.png", height=4.15, point=[-2.45, -0.32, 0], z=15)
        push_contact = self.contact_ring([-1.38, 0.22, 0], radius=0.16)
        push_pair = self.chip("ROBOT HAND + CART", ORANGE, width=3.05, point=[-2.55, -2.54, 0], size=17)
        self.play_at(self.cstart(31), FadeIn(push), Create(push_contact), FadeIn(push_pair), run_time=0.62)
        self.play_at(self.cstart(31) + 1.35, push.animate.shift(RIGHT * 0.72), run_time=1.45, rate_func=rate_functions.ease_out_cubic)
        pull = self.image("robot-pull-trolley.png", height=4.05, point=[2.35, -0.32, 0], z=15)
        cable = Line([2.12, 0.28, 0], [3.24, 0.28, 0], color=GOLD, stroke_width=7)
        pull_pair = self.chip("CABLE + TROLLEY", BLUE, width=2.72, point=[2.55, -2.54, 0], size=17)
        self.play_at(self.cstart(32), FadeIn(pull), Create(cable), FadeIn(pull_pair), run_time=0.62)
        tension = self.force_arrow([2.92, 0.82, 0], [2.18, 0.82, 0], "TENSION", GOLD, label_shift=UP * 0.34)
        self.play_at(self.cstart(33), FadeIn(tension), pull.animate.shift(RIGHT * 0.55), cable.animate.shift(RIGHT * 0.55), run_time=0.72)
        pair_stamp = self.evidence_stamp("Name both objects", [0, -2.88, 0], GREEN, 2.68)
        self.play_at(self.cstart(34), FadeIn(pair_stamp), Indicate(Group(push_pair, pull_pair), color=GOLD, scale_factor=1.01), run_time=0.55)
        rule = self.chip("One object alone cannot make an interaction", VIOLET, width=5.55, point=[0, 1.82, 0], size=18)
        self.play_at(self.cstart(35), FadeOut(push_label), FadeOut(pull_label), FadeIn(rule), run_time=0.50)
        self.dynamic = [heading, divider, push, push_contact, push_pair, pull, cable, pull_pair, tension, pair_stamp, rule]

    def non_contact(self):
        heading = self.start_scene(7, 36, "No touch required", BLUE)
        left, right = self.magnets(-2.15, 2.08, height=2.70)
        gap = DoubleArrow([-0.72, 0.18, 0], [0.68, 0.18, 0], color=WHITE, stroke_width=5)
        gap_tag = self.chip("Visible air gap", BLUE, width=2.28, point=[0, 1.46, 0], size=18)
        poles = VGroup(self.pole_badge("N", [-0.88, 0.62, 0]), self.pole_badge("N", [0.84, 0.62, 0]))
        self.play_at(self.cstart(36) + 0.22, FadeIn(Group(left, right)), Create(gap), FadeIn(gap_tag), FadeIn(poles), run_time=0.68)
        arrows = VGroup(
            self.force_arrow([-1.30, 1.02, 0], [-3.18, 1.02, 0], "MAGNET ON LEFT", ORANGE),
            self.force_arrow([1.30, 1.02, 0], [3.18, 1.02, 0], "MAGNET ON RIGHT", BLUE),
        )
        trails = VGroup(self.trail([-1.72, -1.24, 0], LEFT, ORANGE), self.trail([1.68, -1.24, 0], RIGHT, BLUE))
        self.play_at(self.cstart(37), FadeIn(arrows), left.animate.shift(LEFT * 0.95), right.animate.shift(RIGHT * 0.95), FadeIn(trails), run_time=1.75, rate_func=rate_functions.ease_out_cubic)
        evidence = VGroup(
            self.evidence_stamp("No touch", [-2.05, -2.55, 0], BLUE, 1.70),
            self.evidence_stamp("Motion changed", [2.05, -2.55, 0], GREEN, 2.25),
        )
        self.play_at(self.cstart(38), FadeIn(evidence), run_time=0.52)
        earth = self.earth_vignette([0, -0.20, 0], 0.88)
        self.play_at(self.cstart(39), FadeOut(Group(left, right, gap, gap_tag, poles, arrows, trails, evidence)), FadeIn(earth), run_time=0.70)
        gravity_stamp = self.evidence_stamp("No surface contact", [0, -2.66, 0], VIOLET, 2.72)
        self.play_at(self.cstart(40), FadeIn(gravity_stamp), run_time=0.48)
        self.dynamic = [heading, earth, gravity_stamp]

    def classification(self):
        heading = self.start_scene(8, 41, "Contact or non-contact", GOLD)
        q1 = self.chip("1  Name both objects", BLUE, width=2.85, point=[-2.20, 1.82, 0], size=18)
        q2 = self.chip("2  Do they touch?", ORANGE, width=2.65, point=[2.20, 1.82, 0], size=18)
        connector = Arrow([-0.62, 1.82, 0], [0.62, 1.82, 0], color=GOLD, stroke_width=5)
        self.play_at(self.cstart(41) + 0.22, FadeIn(VGroup(q1, q2)), GrowArrow(connector), run_time=0.58)
        self.play_at(self.cstart(42), Circumscribe(q1, color=BLUE, buff=0.08, fade_out=True), run_time=0.72)
        self.play_at(self.cstart(43), Circumscribe(q2, color=ORANGE, buff=0.08, fade_out=True), run_time=0.62)
        push = self.image("robot-push-cart.png", height=2.70, point=[-3.70, -0.38, 0], z=15)
        push_label = self.chip("CONTACT", ORANGE, width=1.72, point=[-3.70, -2.24, 0], size=18)
        self.play_at(self.cstart(44), FadeIn(push), FadeIn(push_label), Create(self.target_box(push, ORANGE)), run_time=0.58)
        magnets = self.image("magnet-carts.png", height=1.94, point=[0, -0.38, 0], z=15)
        magnet_label = self.chip("NON-CONTACT", BLUE, width=2.15, point=[0, -2.24, 0], size=17)
        self.play_at(self.cstart(45), FadeIn(magnets), FadeIn(magnet_label), run_time=0.52)
        earth = self.earth_vignette([3.68, -0.52, 0], 0.54)
        earth_label = self.chip("NON-CONTACT", VIOLET, width=2.15, point=[3.68, -2.24, 0], size=17)
        self.play_at(self.cstart(46), FadeIn(earth), FadeIn(earth_label), run_time=0.52)
        gauge = VGroup(Arc(radius=0.48, start_angle=PI, angle=-PI, color=RED, stroke_width=6), Arrow([0, 0, 0], [0.36, 0.12, 0], color=RED, buff=0, stroke_width=5)).move_to([0, -1.25, 0])
        strength = self.chip("Strength", RED, width=1.72, point=[0, -2.24, 0], size=17)
        cross = self.cross_mark(gauge)
        rule = self.evidence_stamp("Touching chooses the label", [0, 0.70, 0], GREEN, 3.42)
        self.play_at(self.cstart(47), FadeOut(magnet_label), FadeIn(gauge), FadeIn(strength), Create(cross), FadeIn(rule), run_time=0.62)
        self.dynamic = [heading, q1, q2, connector, push, push_label, magnets, earth, earth_label, gauge, strength, cross, rule]

    def fair_test(self):
        heading = self.start_scene(9, 48, "Test one change", GREEN)
        top_track = Line([-5.05, 0.62, 0], [5.05, 0.62, 0], color=WHITE, stroke_width=5)
        bottom_track = Line([-5.05, -1.18, 0], [5.05, -1.18, 0], color=WHITE, stroke_width=5)
        cart_a = self.image("magnet-cart-orange.png", height=1.45, point=[-4.20, 0.95, 0], z=15)
        cart_b = self.image("magnet-cart-orange.png", height=1.45, point=[-4.20, -0.85, 0], z=15)
        start = DashedLine([-4.20, 1.58, 0], [-4.20, -1.84, 0], color=GOLD, stroke_width=5)
        self.play_at(self.cstart(48) + 0.22, Create(top_track), Create(bottom_track), FadeIn(Group(cart_a, cart_b)), Create(start), run_time=0.66)
        locks = VGroup(
            self.lock_badge("Same cart", [-3.15, 1.88, 0], BLUE),
            self.lock_badge("Same track", [0, 1.88, 0], BLUE),
            self.lock_badge("Same start", [3.15, 1.88, 0], BLUE),
        )
        self.play_at(self.cstart(49), FadeIn(locks), run_time=0.55)
        small = self.force_arrow([-5.18, 1.36, 0], [-4.50, 1.36, 0], "SMALL PUSH", ORANGE, label_shift=UP * 0.36)
        large = self.force_arrow([-5.18, -0.44, 0], [-3.72, -0.44, 0], "LARGE PUSH", ORANGE, label_shift=UP * 0.36)
        self.play_at(self.cstart(50), FadeIn(small), FadeIn(large), run_time=0.58)
        timer = self.chip("Same time", GOLD, width=1.80, point=[0, -2.72, 0], size=18)
        self.play_at(self.cstart(51), cart_a.animate.shift(RIGHT * 2.38), cart_b.animate.shift(RIGHT * 4.05), FadeIn(timer), run_time=1.72, rate_func=rate_functions.ease_out_cubic)
        bad_panel = self.panel("Invalid comparison", RED, 9.70, 3.52, [0, -0.25, 0])
        bad_items = VGroup(
            self.chip("Different cart", RED, 2.05, [-3.15, 0.25, 0], 17),
            self.chip("Different track", RED, 2.18, [0, 0.25, 0], 17),
            self.chip("Different start", RED, 2.18, [3.15, 0.25, 0], 17),
        )
        self.play_at(self.cstart(52), FadeOut(Group(top_track, bottom_track, cart_a, cart_b, start, locks, small, large, timer)), FadeIn(bad_panel), FadeIn(bad_items), run_time=0.66)
        warning = self.warning_stamp("Which change mattered?", [0, -1.52, 0], 3.15)
        self.play_at(self.cstart(53), FadeIn(warning), run_time=0.52)
        self.dynamic = [heading, bad_panel, bad_items, warning]

    def repair(self):
        heading = self.start_scene(10, 54, "Repair the explanation", VIOLET)
        left, right = self.pilots(-3.80, 3.75, height=4.65)
        trails = VGroup(self.trail([-2.65, -1.36, 0], LEFT, BLUE), self.trail([2.62, -1.36, 0], RIGHT, ORANGE))
        self.play_at(self.cstart(54) + 0.22, FadeIn(Group(left, right)), FadeIn(trails), run_time=0.58)
        gap = self.chip("Hands separated", BLUE, width=2.30, point=[0, 1.72, 0], size=18)
        self.play_at(self.cstart(55), FadeIn(gap), run_time=0.46)
        stored = self.chip("Push stored inside?", RED, width=2.75, point=[0, 0.70, 0], size=19)
        self.play_at(self.cstart(56), FadeIn(stored), run_time=0.48)
        no = self.warning_stamp("No stored push", [0, -0.18, 0], 2.18)
        self.play_at(self.cstart(57), Create(self.cross_mark(stored)), FadeIn(no), run_time=0.42)
        timeline = Arrow([-3.65, -2.34, 0], [3.65, -2.34, 0], color=WHITE, stroke_width=5)
        contact_node = Circle(radius=0.14, fill_color=ORANGE, fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to([-2.25, -2.34, 0])
        motion_node = Circle(radius=0.14, fill_color=GREEN, fill_opacity=1, stroke_color=WHITE, stroke_width=2).move_to([1.65, -2.34, 0])
        first = self.chip("Interaction first", ORANGE, width=2.35, point=[-2.25, -1.82, 0], size=17)
        later = self.chip("Motion afterwards", GREEN, width=2.55, point=[1.65, -1.82, 0], size=17)
        self.play_at(self.cstart(58), FadeOut(stored), FadeOut(no), Create(timeline), FadeIn(contact_node), FadeIn(first), run_time=0.60)
        self.play_at(self.cstart(59), left.animate.shift(LEFT * 0.42), right.animate.shift(RIGHT * 0.42), run_time=0.48)
        self.play_at(self.cstart(60), FadeIn(motion_node), FadeIn(later), Indicate(trails, color=GREEN, scale_factor=1.02), run_time=0.58)
        support = self.force_arrow([-3.80, 0.05, 0], [-3.80, 1.18, 0], "TRACK ON PILOT", BLUE, label_shift=LEFT * 1.30)
        gravity = self.force_arrow([3.75, 0.98, 0], [3.75, -0.15, 0], "EARTH ON PILOT", VIOLET, label_shift=RIGHT * 1.30)
        balanced = self.evidence_stamp("Other forces still act", [0, 1.70, 0], GREEN, 2.95)
        self.play_at(self.cstart(61), FadeOut(gap), FadeIn(support), FadeIn(gravity), FadeIn(balanced), run_time=0.62)
        self.dynamic = [heading, left, right, trails, timeline, contact_node, motion_node, first, later, support, gravity, balanced]

    def predict(self):
        heading = self.start_scene(11, 62, "Predict the evidence", GOLD)
        left, right = self.magnets(-2.20, 2.14, height=2.70)
        cover = RoundedRectangle(width=8.80, height=3.88, corner_radius=0.22, stroke_color=GOLD, stroke_width=3, fill_color=INK, fill_opacity=0.88).move_to([0, -0.20, 0])
        prompt = self.chip("Prediction mode", GOLD, width=2.55, point=[0, 1.77, 0], size=20)
        self.play_at(self.cstart(62) + 0.22, FadeIn(Group(left, right)), FadeIn(cover), FadeIn(prompt), run_time=0.58)
        question = Text("Which observations would support\na non-contact interaction?", font_size=30, weight=BOLD, color=WHITE, line_spacing=0.90).move_to([0, 0.12, 0])
        self.play_at(self.cstart(63), FadeIn(question, shift=UP * 0.08), run_time=0.48)
        rings = VGroup(*[Circle(radius=0.32 + index * 0.20, color=GOLD, stroke_width=5, stroke_opacity=1 - index * 0.18) for index in range(3)]).move_to([0, -1.45, 0])
        count = Text("3", font_size=32, weight=BOLD, color=GOLD).move_to(rings)
        self.play_at(self.cstart(64), FadeIn(rings), FadeIn(count), run_time=0.35)
        for value in [2, 1]:
            replacement = Text(str(value), font_size=32, weight=BOLD, color=GOLD).move_to(count)
            self.play(Transform(count, replacement), Indicate(rings, color=GOLD, scale_factor=1.04), run_time=0.68)
        gap = DoubleArrow([-0.72, 0.18, 0], [0.68, 0.18, 0], color=WHITE, stroke_width=5)
        poles = VGroup(self.pole_badge("N", [-0.88, 0.63, 0]), self.pole_badge("N", [0.84, 0.63, 0]))
        trails = VGroup(self.trail([-1.76, -1.22, 0], LEFT, ORANGE), self.trail([1.72, -1.22, 0], RIGHT, BLUE))
        checks = VGroup(
            self.evidence_stamp("Gap visible", [-2.90, -2.55, 0], BLUE, 1.90),
            self.evidence_stamp("Both move", [0, -2.55, 0], GREEN, 1.78),
            self.evidence_stamp("No hand", [2.90, -2.55, 0], ORANGE, 1.72),
        )
        self.play_at(self.cstart(65), FadeOut(cover), FadeOut(question), FadeOut(rings), FadeOut(count), Create(gap), FadeIn(poles), left.animate.shift(LEFT * 0.92), right.animate.shift(RIGHT * 0.92), FadeIn(trails), run_time=1.45, rate_func=rate_functions.ease_out_cubic)
        self.play_at(self.cstart(65) + 1.55, FadeIn(checks[0]), FadeIn(checks[1]), run_time=0.45)
        self.play_at(self.cstart(66), FadeIn(checks[2]), run_time=0.42)
        claim = self.evidence_stamp("Claim supported by observations", [0, 1.77, 0], GREEN, 4.18)
        self.play_at(self.cstart(67), FadeOut(prompt), FadeIn(claim), run_time=0.58)
        self.dynamic = [heading, left, right, gap, poles, trails, checks, claim]

    def exit_scene(self):
        heading = self.start_scene(12, 68, "Your physics move", GREEN)
        hero = self.image("selected-visual-target.png", width=config.frame_width * 1.02, point=[0, -0.04, 0], z=-20)
        shade = Rectangle(width=config.frame_width, height=config.frame_height, stroke_width=0, fill_color=INK, fill_opacity=0.32).set_z_index(-10)
        routine = self.chip("The physicist's routine", GOLD, width=3.55, point=[0, 1.88, 0], size=20)
        self.play_at(self.cstart(68) + 0.22, FadeIn(hero), FadeIn(shade), FadeIn(routine), run_time=0.62)
        step1 = self.chip("1  Name the pair", BLUE, width=2.35, point=[-3.02, -2.38, 0], size=18)
        step2 = self.chip("2  Touch?", ORANGE, width=1.82, point=[0, -2.38, 0], size=18)
        step3 = self.chip("3  Use motion", GREEN, width=2.25, point=[3.02, -2.38, 0], size=18)
        self.play_at(self.cstart(69), FadeIn(step1), run_time=0.42)
        self.play_at(self.cstart(70), FadeIn(step2), step1.animate.set_opacity(0.62), run_time=0.42)
        self.play_at(self.cstart(71), FadeIn(step3), step2.animate.set_opacity(0.62), run_time=0.48)
        hidden = self.chip("Force hidden inside one object", RED, width=4.08, point=[0, 0.68, 0], size=18)
        self.play_at(self.cstart(72), FadeIn(hidden), Create(self.cross_mark(hidden)), run_time=0.55)
        object_a = Circle(radius=0.48, fill_color=BLUE, fill_opacity=0.88, stroke_color=WHITE, stroke_width=3).move_to([-1.92, 0.52, 0])
        object_b = Circle(radius=0.48, fill_color=ORANGE, fill_opacity=0.88, stroke_color=WHITE, stroke_width=3).move_to([1.92, 0.52, 0])
        link = DoubleArrow(object_a.get_right(), object_b.get_left(), color=GOLD, stroke_width=7, buff=0.10)
        label = self.chip("Force belongs to the interaction", GREEN, width=4.38, point=[0, -0.38, 0], size=19)
        self.play_at(self.cstart(73), FadeOut(hidden), FadeIn(VGroup(object_a, object_b)), GrowArrow(link), FadeIn(label), step1.animate.set_opacity(1), step2.animate.set_opacity(1), step3.animate.set_opacity(1), run_time=0.68)
        self.dynamic = [heading, hero, shade, routine, step1, step2, step3, object_a, object_b, link, label]
