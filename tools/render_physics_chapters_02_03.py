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


class PhysicsChapterBase(Scene):
    chapter_number = 0

    def construct(self):
        self.course_dir = Path(os.environ["BQ_PHYSICS_COURSE_DIR"])
        self.timeline = json.loads(Path(os.environ["BQ_TIMELINE_PATH"]).read_text(encoding="utf-8"))
        self.cues = {cue["id"]: cue for cue in self.timeline["cues"]}
        self.captions = {}
        for caption in self.timeline["captionCues"]:
            self.captions.setdefault(caption["sourceCueId"], []).append(caption)
        self.assets = self.course_dir / "assets" / "source" / "kinetic-lab-v3"
        self.background = ImageMobject(str(self.assets / "lab-stage-clean.png"))
        self.background.set_width(config.frame_width * 1.035).set_z_index(-100)
        self.background_shade = Rectangle(
            width=config.frame_width,
            height=config.frame_height,
            stroke_width=0,
            fill_color=INK,
            fill_opacity=0.20,
        ).set_z_index(-90)
        self.header_group = self.header()
        self.add(self.background, self.background_shade, self.header_group)
        self.render_chapter()
        self.wait_until(self.timeline["duration"])

    def render_chapter(self):
        raise NotImplementedError

    def wait_until(self, target):
        remaining = target - self.time
        if remaining > 0.001:
            self.wait(remaining)

    def play_at(self, target, *animations, run_time=0.48, rate_func=smooth):
        self.wait_until(target)
        self.play(*animations, run_time=run_time, rate_func=rate_func)

    def header(self):
        rail = Rectangle(width=config.frame_width, height=0.54, stroke_width=0, fill_color=INK, fill_opacity=0.98).to_edge(UP, buff=0)
        brand = Text("BRIGHT QUEST  /  PHYSICS 101", font_size=17, weight=BOLD, color=WHITE).to_edge(LEFT, buff=0.38).shift(UP * 3.34)
        mission = Text(f"FORCE LAB  //  MISSION {self.chapter_number:02d}", font_size=17, weight=BOLD, color=GOLD).to_edge(RIGHT, buff=0.38).shift(UP * 3.34)
        return VGroup(rail, brand, mission).set_z_index(90)

    def begin_scene(self, number, cue_id, title, accent=ORANGE):
        self.wait_until(self.cues[cue_id]["start"])
        previous = [m for m in list(self.mobjects) if m not in [self.background, self.background_shade, self.header_group]]
        if previous:
            self.play(FadeOut(Group(*previous), shift=DOWN * 0.03), run_time=0.22)
        heading = self.heading(number, title, accent)
        self.play(FadeIn(heading, shift=RIGHT * 0.08), run_time=0.26)
        return heading

    def beat(self, cue_id, index, *animations, run_time=0.48, rate_func=smooth):
        captions = self.captions[cue_id]
        if index >= len(captions):
            return
        self.play_at(captions[index]["start"], *animations, run_time=run_time, rate_func=rate_func)

    def finish_beats(self, cue_id, used, target, accent=GOLD):
        for index in range(used, len(self.captions[cue_id])):
            self.beat(cue_id, index, Circumscribe(target, color=accent, buff=0.08, fade_out=True), run_time=0.58)

    def activate_step(self, card, accent=GREEN):
        tag = card[1]
        return AnimationGroup(
            tag[1].animate.set_fill(accent, opacity=0.96),
            tag[2].animate.set_color(INK),
            lag_ratio=0,
        )

    def heading(self, number, title, accent=ORANGE):
        number_text = Text(f"{number:02d}", font_size=18, weight=BOLD, color=INK)
        badge = RoundedRectangle(width=0.70, height=0.48, corner_radius=0.12, stroke_width=0, fill_color=accent, fill_opacity=1).move_to(number_text)
        label = Text(title.upper(), font_size=22, weight=BOLD, color=WHITE)
        if label.width > 5.65:
            label.scale_to_fit_width(5.65)
        row = VGroup(VGroup(badge, number_text), label).arrange(RIGHT, buff=0.20)
        shell = RoundedRectangle(width=row.width + 0.58, height=0.72, corner_radius=0.16, stroke_color=WHITE, stroke_width=1.6, fill_color=INK, fill_opacity=0.94).move_to(row)
        pips = VGroup(*[
            Circle(radius=0.045, stroke_width=0, fill_color=(accent if i < number else WHITE), fill_opacity=(1 if i < number else 0.22))
            for i in range(12)
        ]).arrange(RIGHT, buff=0.07).next_to(shell, DOWN, buff=0.09).align_to(shell, LEFT)
        return VGroup(shell, row, pips).move_to(LEFT * 3.25 + UP * 2.68).set_z_index(70)

    def chip(self, text, accent=BLUE, width=None, point=ORIGIN, size=18, fill=BLACK):
        label = Text(text.upper(), font_size=size, weight=BOLD, color=WHITE)
        plate_width = width or max(1.5, label.width + 0.48)
        if label.width > plate_width - 0.36:
            label.scale_to_fit_width(plate_width - 0.36)
        plate = RoundedRectangle(width=plate_width, height=0.56, corner_radius=0.14, stroke_color=accent, stroke_width=2.5, fill_color=fill, fill_opacity=0.92).move_to(label)
        glow = plate.copy().set_stroke(accent, width=8, opacity=0.14).scale(1.02)
        return VGroup(glow, plate, label).move_to(point).set_z_index(55)

    def panel(self, title, accent, width, height, point):
        shell = RoundedRectangle(width=width, height=height, corner_radius=0.18, stroke_color=accent, stroke_width=2.5, fill_color=INK, fill_opacity=0.80)
        edge = Line(shell.get_corner(UL) + RIGHT * 0.18, shell.get_corner(UR) + LEFT * 0.18, color=accent, stroke_width=7)
        label = Text(title.upper(), font_size=17, weight=BOLD, color=WHITE).next_to(edge, DOWN, buff=0.12).align_to(shell, LEFT).shift(RIGHT * 0.22)
        return VGroup(shell, edge, label).move_to(point).set_z_index(25)

    def ball(self, point, radius=0.25, color=ORANGE):
        shadow = Ellipse(width=radius * 2.15, height=radius * 0.56, fill_color=BLACK, fill_opacity=0.35, stroke_width=0).move_to(np.array(point) + DOWN * radius * 1.05)
        outer = Circle(radius=radius, stroke_color=WHITE, stroke_width=2.2, fill_color=color, fill_opacity=1)
        outer.set_sheen(0.42, UL)
        seam = Arc(radius=radius * 0.72, start_angle=-PI / 2, angle=PI, color=WHITE, stroke_width=2, stroke_opacity=0.62).rotate(0.55)
        shine = Dot(radius=radius * 0.16, color=WHITE).set_opacity(0.80).shift(UL * radius * 0.46)
        return VGroup(shadow, outer, seam, shine).move_to(point).set_z_index(38)

    def lane(self, label, y, accent, texture="tile"):
        shell = RoundedRectangle(width=9.65, height=0.84, corner_radius=0.18, stroke_color=accent, stroke_width=2.5, fill_color=NAVY, fill_opacity=0.90).move_to([0, y, 0])
        centre = Line([-4.15, y, 0], [4.35, y, 0], color=WHITE, stroke_width=2, stroke_opacity=0.38)
        marks = VGroup()
        if texture == "tile":
            for x in np.linspace(-3.8, 4.0, 12):
                marks.add(Line([x, y - 0.28, 0], [x, y + 0.28, 0], color=BLUE, stroke_width=1.5, stroke_opacity=0.45))
        elif texture == "grass":
            for x in np.linspace(-3.8, 4.1, 30):
                marks.add(Line([x, y - 0.24, 0], [x + 0.06, y + 0.04, 0], color=GREEN, stroke_width=2, stroke_opacity=0.72))
        else:
            for x in np.linspace(-3.8, 4.1, 38):
                marks.add(Line([x, y - 0.25, 0], [x + 0.03, y + 0.18, 0], color=ORANGE, stroke_width=2.2, stroke_opacity=0.72))
        tag = self.chip(label, accent, width=1.42, point=[-4.55, y, 0], size=14)
        return VGroup(shell, centre, marks, tag).set_z_index(28)

    def force_arrow(self, start, end, label, accent, label_shift=UP * 0.40):
        glow = Arrow(start, end, buff=0, color=accent, stroke_width=15, stroke_opacity=0.18, max_tip_length_to_length_ratio=0.18)
        arrow = Arrow(start, end, buff=0, color=accent, stroke_width=8, max_tip_length_to_length_ratio=0.18)
        arrow.set_background_stroke(color=BLACK, width=13, opacity=0.94)
        tag = self.chip(label, accent, width=2.45, size=14).move_to(arrow.get_center() + label_shift)
        return VGroup(glow, arrow, tag).set_z_index(50)

    def evidence(self, text, point, accent=GREEN, width=2.7):
        disc = Circle(radius=0.20, stroke_color=accent, stroke_width=4, fill_color=accent, fill_opacity=0.25)
        tick = VGroup(Line([-0.10, 0, 0], [-0.02, -0.09, 0], color=WHITE, stroke_width=5), Line([-0.02, -0.09, 0], [0.13, 0.11, 0], color=WHITE, stroke_width=5)).move_to(disc)
        return VGroup(VGroup(disc, tick), self.chip(text, accent, width=width, size=16)).arrange(RIGHT, buff=0.12).move_to(point).set_z_index(60)

    def cross(self, target, accent=RED):
        box = SurroundingRectangle(target, buff=0.10)
        return VGroup(Line(box.get_corner(UL), box.get_corner(DR), color=accent, stroke_width=8), Line(box.get_corner(UR), box.get_corner(DL), color=accent, stroke_width=8)).set_z_index(65)

    def lock(self, text, point, accent=BLUE):
        body = RoundedRectangle(width=0.27, height=0.23, corner_radius=0.05, fill_color=accent, fill_opacity=1, stroke_width=0)
        shackle = Arc(radius=0.13, start_angle=0, angle=PI, color=WHITE, stroke_width=4).rotate(PI).next_to(body, UP, buff=-0.05)
        return VGroup(VGroup(body, shackle), self.chip(text, accent, width=1.52, size=13)).arrange(RIGHT, buff=0.08).move_to(point).set_z_index(58)

    def cart(self, point, accent=BLUE, scale=1.0):
        shadow = Ellipse(width=2.0, height=0.28, fill_color=BLACK, fill_opacity=0.34, stroke_width=0).shift(DOWN * 0.45)
        body = RoundedRectangle(width=1.82, height=0.62, corner_radius=0.16, stroke_color=WHITE, stroke_width=2.5, fill_color=accent, fill_opacity=1).set_sheen(0.25, UL)
        deck = RoundedRectangle(width=1.45, height=0.18, corner_radius=0.07, stroke_width=0, fill_color=SOFT, fill_opacity=0.75).shift(UP * 0.12)
        wheels = VGroup(*[Circle(radius=0.19, stroke_color=WHITE, stroke_width=2, fill_color=INK, fill_opacity=1).shift(RIGHT * x + DOWN * 0.39) for x in [-0.58, 0.58]])
        hubs = VGroup(*[Dot(radius=0.07, color=GOLD).move_to(wheel) for wheel in wheels])
        return VGroup(shadow, body, deck, wheels, hubs).scale(scale).move_to(point).set_z_index(38)

    def book(self, point, width=2.25, height=0.78, accent=VIOLET):
        shadow = RoundedRectangle(width=width + 0.10, height=height + 0.08, corner_radius=0.12, stroke_width=0, fill_color=BLACK, fill_opacity=0.35).shift(DOWN * 0.08 + RIGHT * 0.06)
        cover = RoundedRectangle(width=width, height=height, corner_radius=0.12, stroke_color=WHITE, stroke_width=2.4, fill_color=accent, fill_opacity=1).set_sheen(0.30, UL)
        pages = VGroup(*[Line([-width * 0.42, y, 0], [width * 0.42, y, 0], color=SOFT, stroke_width=2, stroke_opacity=0.72) for y in [-0.20, -0.08, 0.04]])
        spine = Line([-width * 0.44, -height * 0.34, 0], [-width * 0.44, height * 0.34, 0], color=GOLD, stroke_width=5)
        return VGroup(shadow, cover, pages, spine).move_to(point).set_z_index(42)

    def foam(self, point, width=2.65, height=0.82, compressed=0.0):
        actual_height = max(0.44, height - compressed)
        shadow = Ellipse(width=width * 1.06, height=0.30, fill_color=BLACK, fill_opacity=0.35, stroke_width=0).shift(DOWN * actual_height * 0.58)
        block = RoundedRectangle(width=width, height=actual_height, corner_radius=0.22, stroke_color=WHITE, stroke_width=2.2, fill_color=BLUE, fill_opacity=0.92).set_sheen(0.34, UL)
        cells = VGroup(*[Circle(radius=0.06, stroke_color=WHITE, stroke_width=1.5, stroke_opacity=0.5).move_to([x, y, 0]) for x in np.linspace(-0.9, 0.9, 5) for y in [-actual_height * 0.18, actual_height * 0.18]])
        return VGroup(shadow, block, cells).move_to(point).set_z_index(35)

    def step_rail(self, labels, accent=GOLD):
        cards = VGroup()
        for index, label in enumerate(labels, 1):
            number = Circle(radius=0.22, stroke_color=accent, stroke_width=3, fill_color=INK, fill_opacity=1)
            numeral = Text(str(index), font_size=17, weight=BOLD, color=WHITE).move_to(number)
            tag = self.chip(label, accent, width=2.12, size=13)
            cards.add(VGroup(VGroup(number, numeral), tag).arrange(DOWN, buff=0.10))
        cards.arrange(RIGHT, buff=0.28)
        rail = Line(cards[0][0].get_center(), cards[-1][0].get_center(), color=accent, stroke_width=4).set_z_index(35)
        return VGroup(rail, cards).move_to([0, -0.35, 0]).set_z_index(48)


class PhysicsChapter02VoiceDirected(PhysicsChapterBase):
    chapter_number = 2

    def render_chapter(self):
        self.track_mystery()
        self.run_comparison()
        self.motion_changes()
        self.before_after()
        self.kick_ended()
        self.surface_friction()
        self.fair_surface_test()
        self.distance_data()
        self.stored_kick()
        self.direction_change()
        self.surface_prediction()
        self.motion_routine()

    def track_mystery(self):
        heading = self.begin_scene(1, "track-mystery", "Three tracks, one mystery")
        lanes = VGroup(self.lane("Tile", 1.15, BLUE, "tile"), self.lane("Grass", -0.20, GREEN, "grass"), self.lane("Carpet", -1.55, ORANGE, "carpet"))
        balls = VGroup(self.ball([-3.55, 1.15, 0], color=BLUE), self.ball([-3.55, -0.20, 0], color=GREEN), self.ball([-3.55, -1.55, 0], color=ORANGE))
        locks = VGroup(self.lock("Same ball", [-2.85, -2.62, 0]), self.lock("Same launch", [0, -2.62, 0]), self.lock("Same start", [2.85, -2.62, 0]))
        prediction = self.chip("Which travels furthest?", GOLD, width=3.35, point=[2.75, 2.15, 0], size=17)
        self.beat("track-mystery", 0, FadeIn(lanes), FadeIn(balls), run_time=0.62)
        self.beat("track-mystery", 1, FadeIn(locks), run_time=0.50)
        self.beat("track-mystery", 2, FadeIn(prediction), Circumscribe(balls, color=GOLD, buff=0.12), run_time=0.58)
        self.finish_beats("track-mystery", 3, prediction)

    def run_comparison(self):
        heading = self.begin_scene(2, "run-comparison", "Run the comparison")
        lanes = VGroup(self.lane("Tile", 1.15, BLUE, "tile"), self.lane("Grass", -0.20, GREEN, "grass"), self.lane("Carpet", -1.55, ORANGE, "carpet"))
        balls = VGroup(self.ball([-3.55, 1.15, 0], color=BLUE), self.ball([-3.55, -0.20, 0], color=GREEN), self.ball([-3.55, -1.55, 0], color=ORANGE))
        launchers = VGroup(*[Arrow([-4.35, y, 0], [-3.82, y, 0], color=GOLD, stroke_width=8, buff=0) for y in [1.15, -0.20, -1.55]])
        gates = VGroup(*[DashedLine([-2.82, y - 0.32, 0], [-2.82, y + 0.32, 0], color=GOLD, stroke_width=4) for y in [1.15, -0.20, -1.55]])
        gate_label = self.chip("Equal entry speed gate", GOLD, 2.75, [-2.05, 2.15, 0], 15)
        starts = self.chip("All still", BLUE, width=1.72, point=[0.75, 2.15, 0], size=16)
        self.beat("run-comparison", 0, FadeIn(lanes), FadeIn(balls), FadeIn(starts), run_time=0.56)
        self.beat("run-comparison", 1, FadeIn(launchers), Flash([-3.75, -0.20, 0], color=GOLD, flash_radius=0.45), run_time=0.48)
        self.beat("run-comparison", 2, FadeOut(launchers), FadeIn(gates), FadeIn(gate_label), run_time=0.48)
        self.beat("run-comparison", 3, balls[0].animate.shift(RIGHT * 7.0), balls[1].animate.shift(RIGHT * 4.7), balls[2].animate.shift(RIGHT * 2.6), run_time=2.4, rate_func=rate_functions.ease_out_cubic)
        stops = VGroup(self.chip("Furthest", BLUE, 1.55, [3.35, 1.70, 0], 14), self.chip("Sooner", GREEN, 1.45, [1.05, 0.25, 0], 14), self.chip("First", ORANGE, 1.35, [-1.05, -1.00, 0], 14))
        self.beat("run-comparison", 4, FadeIn(stops), run_time=0.48)
        self.finish_beats("run-comparison", 5, stops)

    def motion_changes(self):
        heading = self.begin_scene(3, "motion-changes", "Name the motion changes")
        labels = ["Start", "Speed up", "Slow down", "Stop", "Turn"]
        accents = [GREEN, GOLD, ORANGE, RED, VIOLET]
        cards = VGroup()
        for index, (label, accent) in enumerate(zip(labels, accents)):
            panel = self.panel(label, accent, 2.15, 3.35, [-4.55 + index * 2.28, -0.15, 0])
            dots = VGroup()
            if label == "Start": xs = [-0.55, -0.55, 0.25, 0.70]
            elif label == "Speed up": xs = [-0.72, -0.52, -0.14, 0.54]
            elif label == "Slow down": xs = [-0.72, -0.05, 0.33, 0.55]
            elif label == "Stop": xs = [-0.62, 0.05, 0.48, 0.48]
            else: xs = [-0.60, -0.15, 0.22, 0.50]
            for dot_index, x in enumerate(xs):
                y = -0.30 if label != "Turn" else -0.30 + max(0, dot_index - 1) * 0.26
                dots.add(Dot([x, y, 0], radius=0.08, color=accent))
            dots.move_to(panel[0].get_center() + DOWN * 0.25).set_z_index(32)
            cards.add(VGroup(panel, dots))
        self.beat("motion-changes", 0, FadeIn(cards[0]), run_time=0.46)
        for i in range(1, 5): self.beat("motion-changes", i, FadeIn(cards[i], shift=UP * 0.08), run_time=0.42)
        self.finish_beats("motion-changes", 5, cards)

    def before_after(self):
        heading = self.begin_scene(4, "before-after", "Before and after evidence")
        times = ["0 s", "1 s", "2 s", "3 s"]
        xs = [-3.65, -1.45, 0.15, 0.95]
        cards = VGroup()
        for time_label, x in zip(times, xs):
            card = self.panel(time_label, ORANGE, 2.25, 2.8, [x, -0.15, 0])
            ball = self.ball([x, -0.25, 0], radius=0.27, color=ORANGE)
            cards.add(VGroup(card, ball))
        rail = Arrow([-4.65, -2.05, 0], [2.15, -2.05, 0], buff=0, color=WHITE, stroke_width=4)
        stop = self.evidence("No new distance: stop", [3.55, -0.25, 0], RED, 2.8)
        self.beat("before-after", 0, FadeIn(cards[0]), FadeIn(rail), run_time=0.48)
        self.beat("before-after", 1, FadeIn(cards[1]), run_time=0.42)
        self.beat("before-after", 2, FadeIn(cards[2]), run_time=0.42)
        self.beat("before-after", 3, FadeIn(cards[3]), run_time=0.42)
        self.beat("before-after", 4, FadeIn(stop), run_time=0.48)
        self.finish_beats("before-after", 5, stop, RED)

    def kick_ended(self):
        heading = self.begin_scene(5, "kick-ended", "The kick has ended", RED)
        lane = self.lane("Tile", -1.20, BLUE, "tile")
        ball = self.ball([-1.35, -1.20, 0], radius=0.48, color=ORANGE)
        launcher = RoundedRectangle(width=1.15, height=1.40, corner_radius=0.20, stroke_color=WHITE, stroke_width=3, fill_color=COBALT, fill_opacity=1).move_to([-2.38, -1.20, 0]).set_z_index(40)
        contact = Circle(radius=0.23, color=GOLD, stroke_width=6).move_to([-1.82, -1.20, 0]).set_z_index(55)
        push = self.force_arrow([-1.30, -0.88, 0], [1.40, -0.88, 0], "LAUNCHER ON BALL", GOLD)
        timeline = self.step_rail(["Touch", "Separate", "Still moving"], RED).shift(UP * 1.25)
        self.beat("kick-ended", 0, FadeIn(lane), FadeIn(ball), FadeIn(launcher), Create(contact), run_time=0.50)
        self.beat("kick-ended", 1, FadeIn(push), run_time=0.48)
        self.beat("kick-ended", 2, FadeOut(contact), FadeOut(push), launcher.animate.shift(LEFT * 1.0), ball.animate.shift(RIGHT * 3.7), run_time=1.55, rate_func=rate_functions.ease_out_cubic)
        self.beat("kick-ended", 3, FadeIn(timeline), run_time=0.48)
        self.finish_beats("kick-ended", 4, timeline)

    def surface_friction(self):
        heading = self.begin_scene(6, "surface-friction", "What slows the ball?")
        lane = self.lane("Thick carpet", -1.15, ORANGE, "carpet")
        ball = self.ball([0, -0.78, 0], radius=0.58, color=ORANGE)
        contact = self.chip("Surface touches ball", BLUE, 2.55, [0, 1.75, 0], 16)
        friction = self.force_arrow([0, -0.28, 0], [-2.75, -0.28, 0], "SURFACE RESISTANCE", ORANGE)
        motion = Arrow([0.75, 0.72, 0], [3.60, 0.72, 0], buff=0, color=BLUE, stroke_width=7)
        motion_label = self.chip("Rolling motion", BLUE, 2.05, [2.15, 1.20, 0], 15)
        rails = VGroup(Line([-3.8, -2.25, 0], [-1.4, -2.25, 0], color=ORANGE, stroke_width=8), Line([-0.8, -2.25, 0], [3.6, -2.25, 0], color=BLUE, stroke_width=8), self.chip("Carpet: shorter", ORANGE, 1.95, [-2.60, -2.72, 0], 13), self.chip("Tile: longer", BLUE, 1.85, [1.45, -2.72, 0], 13))
        self.beat("surface-friction", 0, FadeIn(lane), FadeIn(ball), FadeIn(contact), run_time=0.50)
        self.beat("surface-friction", 1, FadeIn(VGroup(motion, motion_label)), run_time=0.44)
        self.beat("surface-friction", 2, FadeIn(friction), run_time=0.50)
        self.beat("surface-friction", 3, FadeIn(rails), run_time=0.48)
        self.finish_beats("surface-friction", 4, friction, ORANGE)

    def fair_surface_test(self):
        heading = self.begin_scene(7, "fair-surface-test", "Build a fair test")
        locks = VGroup(self.lock("Same ball", [-3.8, 1.40, 0]), self.lock("Same entry speed", [-1.25, 1.40, 0]), self.lock("Same start", [1.30, 1.40, 0]))
        change = self.chip("Change only surface", ORANGE, 2.65, [3.95, 1.40, 0], 15)
        surfaces = VGroup(self.chip("Tile", BLUE, 1.55, [-2.85, 0.15, 0]), self.chip("Grass", GREEN, 1.55, [0, 0.15, 0]), self.chip("Carpet", ORANGE, 1.55, [2.85, 0.15, 0]))
        ruler_line = NumberLine(x_range=[0, 4, 1], length=7.0, include_numbers=False, color=WHITE).move_to([0, -1.25, 0])
        ruler_labels = VGroup(*[
            Text(str(value), font_size=16, color=SOFT).next_to(ruler_line.n2p(value), DOWN, buff=0.12)
            for value in range(5)
        ])
        ruler = VGroup(ruler_line, ruler_labels)
        repeats = VGroup(*[Circle(radius=0.18, color=GREEN, fill_color=GREEN, fill_opacity=0.22) for _ in range(3)]).arrange(RIGHT, buff=0.18).move_to([0, -2.45, 0])
        repeat_label = self.chip("Repeat each run", GREEN, 2.35, [2.20, -2.45, 0], 15)
        self.beat("fair-surface-test", 0, FadeIn(locks), run_time=0.48)
        self.beat("fair-surface-test", 1, FadeIn(change), FadeIn(surfaces), run_time=0.48)
        self.beat("fair-surface-test", 2, Create(ruler), run_time=0.50)
        self.beat("fair-surface-test", 3, FadeIn(repeats), FadeIn(repeat_label), run_time=0.48)
        self.finish_beats("fair-surface-test", 4, locks)

    def distance_data(self):
        heading = self.begin_scene(8, "distance-data", "Read the data")
        rows = [("Tile", "335 / 345 / 340", 340, BLUE), ("Grass", "215 / 225 / 220", 220, GREEN), ("Carpet", "105 / 115 / 110", 110, ORANGE)]
        table = self.panel("Average stopping distance", GOLD, 5.25, 4.45, [-3.35, -0.20, 0])
        row_groups = VGroup()
        bars = VGroup()
        for index, (name, runs, value, accent) in enumerate(rows):
            y = 0.70 - index * 0.92
            row_groups.add(VGroup(self.chip(name, accent, 1.35, [-4.48, y, 0], 13), Text(runs, font_size=16, color=SOFT).move_to([-3.00, y + 0.16, 0]), Text(f"avg {value} cm", font_size=18, weight=BOLD, color=WHITE).move_to([-2.80, y - 0.20, 0])).set_z_index(32))
            bar = RoundedRectangle(width=1.15, height=value / 100, corner_radius=0.10, stroke_color=WHITE, stroke_width=2, fill_color=accent, fill_opacity=0.88).move_to([1.55 + index * 1.55, -2.08 + value / 200, 0])
            bars.add(bar)
        axis = VGroup(Line([0.6, -2.10, 0], [5.25, -2.10, 0], color=WHITE, stroke_width=3), Line([0.6, -2.10, 0], [0.6, 1.75, 0], color=WHITE, stroke_width=3))
        labels = VGroup(*[Text(name, font_size=14, weight=BOLD, color=accent).next_to(bar, DOWN, buff=0.12) for (name, _, _, accent), bar in zip(rows, bars)])
        self.beat("distance-data", 0, FadeIn(table), run_time=0.46)
        for i in range(3): self.beat("distance-data", i + 1, FadeIn(row_groups[i]), GrowFromEdge(bars[i], DOWN), run_time=0.48)
        self.beat("distance-data", 4, Create(axis), FadeIn(labels), run_time=0.46)
        result = self.evidence("Same pattern", [2.95, 2.05, 0], GREEN, 2.1)
        self.beat("distance-data", 5, FadeIn(result), run_time=0.46)
        self.finish_beats("distance-data", 6, VGroup(row_groups, bars))

    def stored_kick(self):
        heading = self.begin_scene(9, "stored-kick", "Test the tempting idea", RED)
        ball = self.ball([0, -0.45, 0], radius=1.0, color=ORANGE)
        capsule = self.chip("Stored kick", VIOLET, 2.25, [0, -0.45, 0], 17)
        idea = self.chip("Kick force rides inside?", RED, 3.25, [0, 1.65, 0], 17)
        cross = self.cross(capsule)
        rail = self.step_rail(["Contact arrow", "Separation", "Friction remains"], ORANGE).shift(DOWN * 1.20)
        correction = self.evidence("Kick is not stored", [0, 2.25, 0], GREEN, 2.65)
        self.beat("stored-kick", 0, FadeIn(ball), FadeIn(capsule), FadeIn(idea), run_time=0.52)
        self.beat("stored-kick", 1, Create(cross), run_time=0.48)
        self.beat("stored-kick", 2, FadeIn(rail), run_time=0.52)
        self.beat("stored-kick", 3, FadeOut(idea), FadeIn(correction), run_time=0.48)
        self.finish_beats("stored-kick", 4, correction, GREEN)

    def direction_change(self):
        heading = self.begin_scene(10, "direction-change", "Direction is evidence too", VIOLET)
        inbound = Arrow([-4.3, -1.0, 0], [-0.55, -1.0, 0], buff=0, color=BLUE, stroke_width=7)
        bumper = RoundedRectangle(width=0.42, height=2.55, corner_radius=0.10, stroke_color=WHITE, stroke_width=3, fill_color=VIOLET, fill_opacity=1).rotate(-0.55).move_to([0.25, -0.35, 0]).set_z_index(40)
        ball = self.ball([-3.50, -1.0, 0], radius=0.38, color=ORANGE)
        contact = Circle(radius=0.24, color=GOLD, stroke_width=6).move_to([-0.34, -0.70, 0])
        force = self.force_arrow([-0.25, -0.60, 0], [0.75, 1.20, 0], "BUMPER ON BALL", GOLD, label_shift=RIGHT * 1.30)
        outbound = Arrow([0.55, -0.15, 0], [4.10, 2.05, 0], buff=0, color=ORANGE, stroke_width=7)
        compare = self.evidence("Straight in / diagonal out", [0, -2.35, 0], GREEN, 3.45)
        self.beat("direction-change", 0, Create(inbound), FadeIn(ball), FadeIn(bumper), run_time=0.50)
        self.beat("direction-change", 1, ball.animate.move_to([-0.42, -0.73, 0]), Create(contact), run_time=1.10, rate_func=linear)
        self.beat("direction-change", 2, FadeIn(force), Create(outbound), ball.animate.move_to([3.25, 1.50, 0]), run_time=1.35, rate_func=rate_functions.ease_out_cubic)
        self.beat("direction-change", 3, FadeIn(compare), run_time=0.48)
        self.finish_beats("direction-change", 4, VGroup(inbound, outbound))

    def surface_prediction(self):
        heading = self.begin_scene(11, "surface-prediction", "Make a prediction", GOLD)
        labels = [("Longer than tile", BLUE), ("Between", GREEN), ("Shorter than carpet", ORANGE)]
        rails = VGroup()
        for index, (label, accent) in enumerate(labels):
            y = 1.10 - index * 1.15
            line = Line([-3.8, y, 0], [3.8 - index * 1.25, y, 0], color=accent, stroke_width=10)
            rails.add(VGroup(line, self.chip(label, accent, 2.45, [4.55, y, 0], 14)))
        rubber = self.chip("Higher-resistance rubber mat", VIOLET, 3.45, [0, 2.20, 0], 15)
        countdown = VGroup(*[Circle(radius=0.28, color=GOLD, stroke_width=3) for _ in range(3)]).arrange(RIGHT, buff=0.25).move_to([0, -2.45, 0])
        reveal = self.evidence("Prediction to test", [0, -2.45, 0], GREEN, 2.55)
        self.beat("surface-prediction", 0, FadeIn(rubber), FadeIn(rails), run_time=0.56)
        self.beat("surface-prediction", 1, Circumscribe(rubber, color=VIOLET, buff=0.08), run_time=0.62)
        self.beat("surface-prediction", 2, Flash(rubber, color=GOLD, flash_radius=1.65), run_time=0.58)
        self.beat("surface-prediction", 3, FadeIn(countdown), run_time=0.48)
        self.beat("surface-prediction", 4, AnimationGroup(Circumscribe(rails[0], color=BLUE, buff=0.06), Circumscribe(rails[1], color=GREEN, buff=0.06), lag_ratio=0.48), run_time=1.65)
        self.beat("surface-prediction", 5, Circumscribe(rails[2], color=GOLD, buff=0.08), run_time=0.72)
        self.beat("surface-prediction", 6, FadeOut(countdown), run_time=0.42)
        self.beat("surface-prediction", 7, FadeIn(reveal), Circumscribe(rails[2], color=GOLD, buff=0.08), run_time=0.62)

    def motion_routine(self):
        heading = self.begin_scene(12, "motion-routine", "Your evidence routine", GREEN)
        rail = self.step_rail(["Compare", "Name change", "Name pair", "Use evidence"], GREEN)
        hero = VGroup(self.ball([-1.3, -2.10, 0], 0.34, ORANGE), Arrow([-0.75, -2.10, 0], [1.70, -2.10, 0], color=BLUE, stroke_width=6, buff=0), self.chip("No stored kick", RED, 2.25, [3.35, -2.10, 0], 15))
        self.beat("motion-routine", 0, FadeIn(rail), run_time=0.52)
        for i in range(1, 5): self.beat("motion-routine", i, self.activate_step(rail[1][i - 1]), run_time=0.46)
        self.beat("motion-routine", 5, FadeIn(hero), run_time=0.50)
        final = self.evidence("Motion evidence explains", [0, 1.80, 0], GREEN, 3.15)
        self.beat("motion-routine", 6, FadeIn(final), run_time=0.48)
        self.finish_beats("motion-routine", 7, VGroup(rail, final), GREEN)


class PhysicsChapter03VoiceDirected(PhysicsChapterBase):
    chapter_number = 3

    def render_chapter(self):
        self.support_mystery()
        self.support_pair()
        self.still_forces()
        self.support_load()
        self.applied_push()
        self.applied_pull()
        self.comparison_meter()
        self.fair_pull_test()
        self.pull_data()
        self.silent_table()
        self.choose_model()
        self.force_routine()

    def support_setup(self, two_books=False, compressed=0.18):
        foam = self.foam([0, -1.35, 0], compressed=compressed)
        book1 = self.book([0, -0.48, 0])
        books = [book1]
        if two_books: books.append(self.book([0, 0.34, 0], accent=ORANGE))
        table = RoundedRectangle(width=6.8, height=0.34, corner_radius=0.08, stroke_color=WHITE, stroke_width=2, fill_color=NAVY, fill_opacity=1).move_to([0, -2.02, 0]).set_z_index(30)
        return VGroup(table, foam, *books), foam, VGroup(*books)

    def support_mystery(self):
        heading = self.begin_scene(1, "support-mystery", "The quiet force mystery")
        setup, foam, books = self.support_setup(False, 0.20)
        still = self.chip("Book is still", VIOLET, 2.05, [-3.55, 1.55, 0], 16)
        patch = RoundedRectangle(width=2.15, height=0.28, corner_radius=0.10, stroke_color=GOLD, stroke_width=5).move_to([0, -0.93, 0]).set_z_index(58)
        question = self.chip("Is the foam doing nothing?", GOLD, 3.45, [2.80, 1.55, 0], 16)
        self.beat("support-mystery", 0, FadeIn(setup, shift=UP * 0.08), FadeIn(still), run_time=0.58)
        self.beat("support-mystery", 1, Create(patch), Indicate(foam, color=BLUE, scale_factor=1.02), run_time=0.52)
        self.beat("support-mystery", 2, FadeIn(question), run_time=0.48)
        self.finish_beats("support-mystery", 3, patch)

    def support_pair(self):
        heading = self.begin_scene(2, "support-pair", "Name both objects")
        setup, foam, books = self.support_setup(False, 0.20)
        contact = Circle(radius=0.24, color=GOLD, stroke_width=6).move_to([0, -0.92, 0]).set_z_index(58)
        down = self.force_arrow([0, -0.28, 0], [0, -1.65, 0], "BOOK ON FOAM", VIOLET, RIGHT * 1.45)
        up = self.force_arrow([0, -1.50, 0], [0, -0.08, 0], "FOAM ON BOOK", BLUE, LEFT * 1.45)
        receivers = self.chip("Interaction pair: different receivers", GOLD, 4.05, [0, 1.62, 0], 15)
        earth = self.force_arrow([0.20, 0.20, 0], [0.20, -1.10, 0], "EARTH ON BOOK", VIOLET, RIGHT * 1.35)
        support = self.force_arrow([-0.20, -1.10, 0], [-0.20, 0.20, 0], "FOAM ON BOOK", BLUE, LEFT * 1.35)
        forces_on_book = self.evidence("Forces on the book", [3.75, 1.62, 0], GREEN, 2.75)
        self.beat("support-pair", 0, FadeIn(setup), Create(contact), run_time=0.50)
        self.beat("support-pair", 1, FadeIn(down), run_time=0.48)
        self.beat("support-pair", 2, FadeIn(up), run_time=0.48)
        self.beat("support-pair", 3, FadeIn(receivers), run_time=0.48)
        self.beat("support-pair", 4, FadeOut(VGroup(down, up, receivers)), FadeIn(VGroup(earth, support)), FadeIn(forces_on_book), run_time=0.56)
        self.finish_beats("support-pair", 5, VGroup(earth, support, forces_on_book), BLUE)

    def still_forces(self):
        heading = self.begin_scene(3, "still-forces", "Still can have forces", RED)
        states = VGroup()
        for index, title in enumerate(["Supported", "Support removed", "Support restored"]):
            x = -3.85 + index * 3.85
            panel = self.panel(title, [BLUE, RED, GREEN][index], 3.45, 4.25, [x, -0.15, 0])
            book = self.book([x, -0.15 if index != 1 else -1.05, 0], width=1.75, height=0.62, accent=VIOLET)
            if index != 1:
                foam = self.foam([x, -1.03, 0], width=2.0, height=0.66, compressed=0.14)
                states.add(VGroup(panel, foam, book))
            else:
                arrow = Arrow([x, 0.15, 0], [x, -1.75, 0], buff=0, color=VIOLET, stroke_width=7)
                states.add(VGroup(panel, book, arrow))
        false_claim = self.chip("Still = no forces", RED, 2.55, [0, 2.18, 0], 16)
        cross = self.cross(false_claim)
        earth = Arrow([3.68, 0.35, 0], [3.68, -0.55, 0], buff=0, color=VIOLET, stroke_width=7)
        support = Arrow([4.02, -0.55, 0], [4.02, 0.35, 0], buff=0, color=BLUE, stroke_width=7)
        self.beat("still-forces", 0, FadeIn(states[0]), run_time=0.48)
        self.beat("still-forces", 1, FadeIn(states[1]), run_time=0.48)
        self.beat("still-forces", 2, FadeIn(states[2]), run_time=0.48)
        self.beat("still-forces", 3, FadeIn(false_claim), Create(cross), GrowArrow(earth), GrowArrow(support), run_time=0.62)
        self.finish_beats("still-forces", 4, VGroup(states[2], earth, support))

    def support_load(self):
        heading = self.begin_scene(4, "support-load", "Change the load")
        one_setup, one_foam, one_books = self.support_setup(False, 0.14)
        one_setup.scale(0.78).move_to([-3.15, -0.35, 0])
        two_setup, two_foam, two_books = self.support_setup(True, 0.32)
        two_setup.scale(0.78).move_to([3.15, -0.35, 0])
        one_label = self.chip("One book", BLUE, 1.75, [-3.15, 1.70, 0], 15)
        two_label = self.chip("Two books", ORANGE, 1.85, [3.15, 1.70, 0], 15)
        short = Arrow([-3.15, -1.25, 0], [-3.15, 0.05, 0], buff=0, color=BLUE, stroke_width=8)
        long = Arrow([3.15, -1.45, 0], [3.15, 0.55, 0], buff=0, color=BLUE, stroke_width=8)
        note = self.chip("Compare only in this scene", GOLD, 3.25, [0, -2.55, 0], 15)
        self.beat("support-load", 0, FadeIn(one_setup), FadeIn(one_label), FadeIn(short), run_time=0.52)
        self.beat("support-load", 1, FadeIn(two_setup), FadeIn(two_label), run_time=0.52)
        self.beat("support-load", 2, GrowArrow(long), run_time=0.52)
        self.beat("support-load", 3, FadeIn(note), run_time=0.46)
        self.finish_beats("support-load", 4, VGroup(short, long), BLUE)

    def applied_push(self):
        heading = self.begin_scene(5, "applied-push", "Applied pushes")
        cart = self.cart([0.20, -1.05, 0], BLUE, 1.08)
        hand = RoundedRectangle(width=1.35, height=0.78, corner_radius=0.28, stroke_color=WHITE, stroke_width=3, fill_color=ORANGE, fill_opacity=1).move_to([-2.20, -1.05, 0]).set_z_index(42)
        contact = Circle(radius=0.22, color=GOLD, stroke_width=6).move_to([-0.82, -1.05, 0]).set_z_index(56)
        push = self.force_arrow([0.05, -0.45, 0], [3.10, -0.45, 0], "HAND ON CART", GOLD)
        label = self.evidence("Applied force", [0, 1.55, 0], GREEN, 2.25)
        self.beat("applied-push", 0, FadeIn(hand), FadeIn(cart), run_time=0.48)
        self.beat("applied-push", 1, hand.animate.shift(RIGHT * 1.10), Create(contact), run_time=0.62)
        self.beat("applied-push", 2, FadeIn(push), cart.animate.shift(RIGHT * 1.75), run_time=1.25, rate_func=rate_functions.ease_out_cubic)
        self.beat("applied-push", 3, FadeIn(label), run_time=0.46)
        self.finish_beats("applied-push", 4, push, GOLD)

    def applied_pull(self):
        heading = self.begin_scene(6, "applied-pull", "Applied pulls")
        cart = self.cart([1.65, -1.10, 0], ORANGE, 1.05)
        robot = VGroup(Circle(radius=0.52, stroke_color=WHITE, stroke_width=3, fill_color=COBALT, fill_opacity=1), Dot(radius=0.08, color=GOLD).shift(LEFT * 0.18), Dot(radius=0.08, color=GOLD).shift(RIGHT * 0.18)).move_to([-3.35, -0.72, 0]).set_z_index(42)
        band = always_redraw(lambda: Line(robot.get_right(), cart.get_left(), color=VIOLET, stroke_width=10).set_z_index(45))
        pull = self.force_arrow([1.25, -0.42, 0], [-1.80, -0.42, 0], "BAND ON CART", VIOLET)
        stored = self.chip("Stored pull", RED, 2.05, [3.75, 1.45, 0], 15)
        cross = self.cross(stored)
        correction = self.evidence("Applied, not stored", [3.45, 1.45, 0], GREEN, 2.75)
        self.beat("applied-pull", 0, FadeIn(robot), FadeIn(cart), Create(band), run_time=0.52)
        self.beat("applied-pull", 1, FadeIn(pull), run_time=0.48)
        self.beat("applied-pull", 2, cart.animate.shift(LEFT * 1.15), run_time=1.12, rate_func=rate_functions.ease_out_cubic)
        self.beat("applied-pull", 3, FadeIn(stored), Create(cross), run_time=0.48)
        self.beat("applied-pull", 4, FadeOut(VGroup(stored, cross)), FadeIn(correction), Circumscribe(pull, color=VIOLET, buff=0.08), run_time=0.62)

    def comparison_meter(self):
        heading = self.begin_scene(7, "comparison-meter", "Build a comparison meter")
        ruler_line = NumberLine(x_range=[0, 5, 1], length=8.0, include_numbers=False, unit_size=1.4, color=WHITE).move_to([0, -0.90, 0])
        ruler_labels = VGroup(*[
            Text(str(value), font_size=16, color=SOFT).next_to(ruler_line.n2p(value), DOWN, buff=0.12)
            for value in range(6)
        ])
        ruler = VGroup(ruler_line, ruler_labels)
        resting = Dot(ruler_line.n2p(0), radius=0.16, color=BLUE)
        two = Dot(ruler_line.n2p(2), radius=0.18, color=GOLD)
        four = Dot(ruler_line.n2p(4), radius=0.20, color=ORANGE)
        band2 = Line(ruler_line.n2p(0) + UP * 0.55, ruler_line.n2p(2) + UP * 0.55, color=GOLD, stroke_width=10)
        band4 = Line(ruler_line.n2p(0) + UP * 1.20, ruler_line.n2p(4) + UP * 1.20, color=ORANGE, stroke_width=10)
        badge = self.evidence("Relative comparison", [0, 1.85, 0], GREEN, 2.75)
        scope = self.chip("Centimetres of stretch - not Newtons", RED, 4.25, [0, -2.45, 0], 15)
        self.beat("comparison-meter", 0, Create(ruler), FadeIn(resting), run_time=0.52)
        self.beat("comparison-meter", 1, Create(band2), FadeIn(two), run_time=0.48)
        self.beat("comparison-meter", 2, Create(band4), FadeIn(four), run_time=0.48)
        self.beat("comparison-meter", 3, FadeIn(badge), run_time=0.46)
        self.beat("comparison-meter", 4, FadeIn(scope), run_time=0.46)
        self.finish_beats("comparison-meter", 5, scope, RED)

    def fair_pull_test(self):
        heading = self.begin_scene(8, "fair-pull-test", "Run a fair pull test")
        locks = VGroup(self.lock("Same cart", [-4.35, 1.70, 0]), self.lock("Same surface", [-1.45, 1.70, 0]), self.lock("Same start", [1.45, 1.70, 0]), self.lock("Same time", [4.35, 1.70, 0]))
        left_panel = self.panel("2 cm stretch", GOLD, 5.0, 3.65, [-2.70, -0.45, 0])
        right_panel = self.panel("4 cm stretch", ORANGE, 5.0, 3.65, [2.70, -0.45, 0])
        left_cart = self.cart([-3.55, -0.65, 0], GOLD, 0.72)
        right_cart = self.cart([1.85, -0.65, 0], ORANGE, 0.72)
        left_trace = Line([-3.55, -1.65, 0], [-1.55, -1.65, 0], color=GOLD, stroke_width=8)
        right_trace = Line([1.85, -1.65, 0], [4.65, -1.65, 0], color=ORANGE, stroke_width=8)
        timers = VGroup(self.chip("1 second", BLUE, 1.55, [-2.70, 0.80, 0], 14), self.chip("1 second", BLUE, 1.55, [2.70, 0.80, 0], 14))
        self.beat("fair-pull-test", 0, FadeIn(locks), run_time=0.50)
        self.beat("fair-pull-test", 1, FadeIn(left_panel), FadeIn(left_cart), FadeIn(timers[0]), run_time=0.50)
        self.beat("fair-pull-test", 2, left_cart.animate.shift(RIGHT * 1.65), Create(left_trace), run_time=1.05)
        self.beat("fair-pull-test", 3, FadeIn(right_panel), FadeIn(right_cart), FadeIn(timers[1]), run_time=0.50)
        self.beat("fair-pull-test", 4, right_cart.animate.shift(RIGHT * 2.35), Create(right_trace), run_time=1.05)
        self.finish_beats("fair-pull-test", 5, locks)

    def pull_data(self):
        heading = self.begin_scene(9, "pull-data", "Read the result")
        table = self.panel("Pull test", GOLD, 5.20, 4.50, [-3.20, -0.15, 0])
        rows = VGroup(
            VGroup(self.chip("2 cm stretch", GOLD, 2.05, [-4.05, 0.55, 0], 14), Text("80 cm", font_size=25, weight=BOLD, color=WHITE).move_to([-2.00, 0.55, 0])),
            VGroup(self.chip("4 cm stretch", ORANGE, 2.05, [-4.05, -0.55, 0], 14), Text("150 cm", font_size=25, weight=BOLD, color=WHITE).move_to([-2.00, -0.55, 0])),
        ).set_z_index(32)
        axis = VGroup(Line([0.7, -2.05, 0], [5.0, -2.05, 0], color=WHITE, stroke_width=3), Line([0.7, -2.05, 0], [0.7, 1.65, 0], color=WHITE, stroke_width=3))
        bar80 = RoundedRectangle(width=1.35, height=1.60, corner_radius=0.10, fill_color=GOLD, fill_opacity=0.90, stroke_color=WHITE, stroke_width=2).move_to([2.00, -1.25, 0])
        bar150 = RoundedRectangle(width=1.35, height=3.00, corner_radius=0.10, fill_color=ORANGE, fill_opacity=0.90, stroke_color=WHITE, stroke_width=2).move_to([4.00, -0.55, 0])
        labels = VGroup(Text("80", font_size=20, weight=BOLD, color=WHITE).next_to(bar80, UP, 0.10), Text("150", font_size=20, weight=BOLD, color=WHITE).next_to(bar150, UP, 0.10))
        evidence = self.evidence("Larger motion change", [0.0, 2.05, 0], GREEN, 3.0)
        self.beat("pull-data", 0, FadeIn(table), FadeIn(rows[0]), run_time=0.48)
        self.beat("pull-data", 1, FadeIn(rows[1]), run_time=0.44)
        self.beat("pull-data", 2, Create(axis), GrowFromEdge(bar80, DOWN), GrowFromEdge(bar150, DOWN), FadeIn(labels), run_time=0.62)
        self.beat("pull-data", 3, FadeIn(evidence), run_time=0.48)
        self.beat("pull-data", 4, Circumscribe(bar150, color=ORANGE, buff=0.08), run_time=0.68)
        self.beat("pull-data", 5, Flash(evidence, color=GREEN, flash_radius=1.75), run_time=0.72)

    def silent_table(self):
        heading = self.begin_scene(10, "silent-table", "Repair the silent-table idea", RED)
        claim = self.chip("A still table does nothing", RED, 3.35, [0, 1.85, 0], 16)
        setup, foam, books = self.support_setup(False, 0.20)
        patch = RoundedRectangle(width=2.20, height=0.30, corner_radius=0.10, stroke_color=GOLD, stroke_width=5).move_to([0, -0.92, 0])
        table_box = SurroundingRectangle(setup[0], color=BLUE, buff=0.08, corner_radius=0.12, stroke_width=4)
        cross = self.cross(claim)
        correction = self.evidence("Surface is part of the interaction", [0, -2.55, 0], GREEN, 4.0)
        self.beat("silent-table", 0, FadeIn(claim), run_time=0.44)
        self.beat("silent-table", 1, FadeIn(setup), Create(table_box), run_time=0.52)
        self.beat("silent-table", 2, Create(patch), Indicate(foam, color=BLUE, scale_factor=1.02), run_time=0.50)
        self.beat("silent-table", 3, Create(cross), FadeIn(correction), run_time=0.52)
        self.finish_beats("silent-table", 4, correction, GREEN)

    def choose_model(self):
        heading = self.begin_scene(11, "choose-model", "Choose the correct model", GOLD)
        panels = VGroup()
        for index, title in enumerate(["One arrow", "No arrows", "Paired arrows"]):
            accent = [RED, RED, GREEN][index]
            x = -3.85 + index * 3.85
            panel = self.panel(title, accent, 3.45, 4.25, [x, -0.18, 0])
            book = self.book([x, -0.15, 0], 1.65, 0.58)
            foam = self.foam([x, -1.00, 0], 1.95, 0.62, 0.12)
            arrows = VGroup()
            if index == 0: arrows.add(Arrow([x, 0.50, 0], [x, -0.75, 0], color=VIOLET, stroke_width=7, buff=0))
            if index == 2:
                arrows.add(Arrow([x - 0.18, 0.50, 0], [x - 0.18, -0.72, 0], color=VIOLET, stroke_width=7, buff=0), Arrow([x + 0.18, -0.72, 0], [x + 0.18, 0.50, 0], color=BLUE, stroke_width=7, buff=0))
            panels.add(VGroup(panel, foam, book, arrows))
        labels = VGroup(self.chip("Earth on book", VIOLET, 1.75, [-3.85, 1.06, 0], 12), self.chip("Earth down / foam up", GREEN, 2.35, [3.85, 1.06, 0], 12))
        countdown = VGroup(*[Circle(radius=0.24, color=GOLD, stroke_width=3) for _ in range(3)]).arrange(RIGHT, buff=0.20).move_to([0, -2.60, 0])
        self.beat("choose-model", 0, FadeIn(panels), FadeIn(labels), run_time=0.60)
        self.beat("choose-model", 1, FadeIn(countdown), run_time=0.46)
        self.beat("choose-model", 2, panels[0].animate.set_opacity(0.25), panels[1].animate.set_opacity(0.25), Circumscribe(panels[2], color=GREEN, buff=0.08), run_time=0.58)
        self.beat("choose-model", 3, FadeOut(countdown), Circumscribe(panels[2][3], color=GOLD, buff=0.08), run_time=0.58)
        self.finish_beats("choose-model", 4, panels[2], GREEN)

    def force_routine(self):
        heading = self.begin_scene(12, "force-routine", "Your force-model routine", GREEN)
        rail = self.step_rail(["Name pair", "Mark contact", "Place on receiver", "Point direction", "Fair comparison"], GREEN)
        hero, foam, books = self.support_setup(False, 0.20)
        hero.scale(0.58).move_to([0, -2.25, 0])
        support = Arrow([0, -2.70, 0], [0, -1.55, 0], color=BLUE, stroke_width=7, buff=0)
        self.beat("force-routine", 0, FadeIn(rail), run_time=0.52)
        for i in range(1, 6): self.beat("force-routine", i, self.activate_step(rail[1][i - 1]), run_time=0.44)
        self.beat("force-routine", 6, FadeIn(hero), GrowArrow(support), run_time=0.50)
        final = self.evidence("Even a still surface can push", [0, 1.82, 0], GREEN, 3.65)
        self.beat("force-routine", 7, FadeIn(final), run_time=0.48)
        self.finish_beats("force-routine", 8, VGroup(rail, final), GREEN)
