import json
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
MUTED = "#55738B"


class PhysicsChapter01(Scene):
    def construct(self):
        course_dir = Path(os.environ["BQ_PHYSICS_COURSE_DIR"])
        timeline = json.loads(Path(os.environ["BQ_TIMELINE_PATH"]).read_text(encoding="utf-8"))
        source_dir = course_dir / "assets" / "source"
        images = {
            "contact": source_dir / "chapter-01-contact-hero.png",
            "separation": source_dir / "chapter-01-separation.png",
            "magnets": source_dir / "chapter-01-magnets.png",
        }

        persistent = self.header()
        self.add(persistent)
        current_background = None

        for index, cue in enumerate(timeline["cues"]):
            background_key = self.background_for(index)
            background = self.background(images[background_key], index)
            board, focus = self.evidence_board(index, cue["title"])

            if current_background is None:
                self.play(FadeIn(background), run_time=0.7)
                self.bring_to_front(persistent)
            else:
                self.play(FadeOut(current_background), FadeIn(background), run_time=0.75)
                self.bring_to_front(persistent)
            current_background = background

            self.play(FadeIn(board, shift=UP * 0.10), run_time=0.55)
            self.play(LaggedStart(*[FadeIn(item, shift=UP * 0.08) for item in focus], lag_ratio=0.09), run_time=0.85)

            available = max(1.4, cue["beatEnd"] - cue["start"] - 2.1)
            first_hold = min(available * 0.48, 5.0)
            self.play(background.animate.scale(1.008).shift(self.motion_shift(index)), run_time=first_hold, rate_func=linear)
            remaining = max(0.25, available - first_hold)
            emphasis = self.emphasis_for(focus, index)
            if emphasis:
                self.play(emphasis, run_time=min(0.8, remaining * 0.35))
                remaining = max(0.15, remaining - min(0.8, remaining * 0.35))
            self.wait(remaining)
            self.play(FadeOut(board), run_time=0.45)

        self.wait(max(0.1, timeline["duration"] - timeline["cues"][-1]["beatEnd"]))

    def header(self):
        rail = Rectangle(width=config.frame_width, height=0.72, stroke_width=0, fill_color=INK, fill_opacity=0.96).to_edge(UP, buff=0)
        brand = Text("BRIGHT QUEST  /  PHYSICS 101", font_size=20, weight=BOLD, color=CREAM).to_edge(LEFT, buff=0.42).shift(UP * 3.24)
        chapter = Text("01  FORCE IS AN INTERACTION", font_size=19, weight=BOLD, color=GOLD).to_edge(RIGHT, buff=0.42).shift(UP * 3.24)
        marker = VGroup(*[
            RoundedRectangle(width=0.56, height=0.08, corner_radius=0.04, stroke_width=0, fill_color=(GOLD if i == 0 else "#6E8496"), fill_opacity=(1 if i == 0 else 0.45))
            for i in range(11)
        ]).arrange(RIGHT, buff=0.08).move_to(DOWN * 3.28)
        return VGroup(rail, brand, chapter, marker).set_z_index(20)

    def background(self, image_path, index):
        image = ImageMobject(str(image_path)).set_width(config.frame_width)
        image.move_to(DOWN * 0.02)
        image.set_z_index(-20)
        wash = Rectangle(width=config.frame_width, height=config.frame_height - 0.72, stroke_width=0, fill_color=CREAM, fill_opacity=0.04).to_edge(DOWN, buff=0)
        wash.set_z_index(-19)
        return Group(image, wash)

    def background_for(self, index):
        if index <= 2 or index == 11:
            return "contact"
        if index <= 5 or index == 9:
            return "separation"
        return "magnets"

    def motion_shift(self, index):
        return (LEFT if index % 2 == 0 else RIGHT) * 0.035

    def evidence_board(self, index, title):
        board = RoundedRectangle(width=4.9, height=4.75, corner_radius=0.18, stroke_color="#D5A33B", stroke_width=2.4, fill_color=CREAM, fill_opacity=0.94)
        board.to_edge(RIGHT, buff=0.34).shift(DOWN * 0.12)
        title_text = Text(title.upper(), font_size=24, weight=BOLD, color=INK)
        if title_text.width > 4.15:
            title_text.scale_to_fit_width(4.15)
        title_text.move_to(board.get_top() + DOWN * 0.55)
        rule = Line(LEFT * 1.95, RIGHT * 1.95, color="#D7C7A5", stroke_width=2).next_to(title_text, DOWN, buff=0.20)
        content = self.diagram(index).move_to(board.get_center() + DOWN * 0.30)
        group = VGroup(board, title_text, rule, content).set_z_index(5)
        focus = list(content.submobjects) if len(content.submobjects) else [content]
        return group, focus

    def diagram(self, index):
        if index == 0:
            return VGroup(self.chip("SKATER A", COBALT), self.chip("SKATER B", GOLD), self.note("LOOK FOR THE PAIR", ORANGE)).arrange(DOWN, buff=0.34)
        if index == 1:
            pair = VGroup(self.chip("OBJECT A", COBALT, 1.82), self.chip("OBJECT B", GOLD, 1.82)).arrange(RIGHT, buff=0.24)
            link = DoubleArrow(pair[0].get_right(), pair[1].get_left(), buff=0.08, color=ORANGE, stroke_width=6)
            return VGroup(pair, link, self.note("ONE INTERACTION", GREEN).shift(DOWN * 1.10))
        if index == 2:
            left = self.object_token("A", COBALT).shift(LEFT * 1.2)
            right = self.object_token("B", GOLD).shift(RIGHT * 1.2)
            arrows = VGroup(Arrow(LEFT * 0.35, LEFT * 1.10, buff=0, color=COBALT, stroke_width=7), Arrow(RIGHT * 0.35, RIGHT * 1.10, buff=0, color=ORANGE, stroke_width=7)).shift(DOWN * 0.20)
            labels = VGroup(Text("B on A", font_size=18, weight=BOLD, color=COBALT).shift(LEFT * 1.15 + DOWN * 0.75), Text("A on B", font_size=18, weight=BOLD, color=ORANGE).shift(RIGHT * 1.15 + DOWN * 0.75))
            return VGroup(left, right, arrows, labels)
        if index == 3:
            before = self.evidence("BEFORE", "STILL", COBALT)
            after = self.evidence("AFTER", "MOVING", ORANGE)
            row = VGroup(before, after).arrange(RIGHT, buff=0.34)
            return VGroup(row, Arrow(before.get_right(), after.get_left(), buff=0.08, color=GREEN, stroke_width=5), self.note("CHANGE = EVIDENCE", GREEN).shift(DOWN * 1.25))
        if index == 4:
            contact = self.chip("HANDS TOUCH", ORANGE)
            ended = self.chip("HANDS APART", COBALT)
            row = VGroup(contact, ended).arrange(DOWN, buff=0.44)
            cross = Cross(contact, stroke_color=RED, stroke_width=5)
            return VGroup(row, cross, self.note("THE PUSH ENDS", RED).shift(DOWN * 1.45))
        if index == 5:
            push = self.evidence("PUSH", "HAND ON CART", ORANGE)
            pull = self.evidence("PULL", "ROPE ON TROLLEY", COBALT)
            return VGroup(push, pull).arrange(DOWN, buff=0.40)
        if index == 6:
            gap = DoubleArrow(LEFT * 0.65, RIGHT * 0.65, buff=0, color=CYAN, stroke_width=5)
            magnets = VGroup(self.object_token("N", RED), self.object_token("N", RED)).arrange(RIGHT, buff=1.15)
            return VGroup(magnets, gap, self.note("VISIBLE AIR GAP", COBALT).shift(DOWN * 1.10), self.note("MOTION STILL CHANGES", GREEN).shift(DOWN * 1.62))
        if index == 7:
            return VGroup(self.step("1", "NAME BOTH OBJECTS", COBALT), self.step("2", "DO THEY TOUCH?", ORANGE), self.step("3", "CHECK THE MOTION", GREEN)).arrange(DOWN, buff=0.22)
        if index == 8:
            keep = VGroup(self.chip("SAME CART", COBALT), self.chip("SAME SURFACE", COBALT)).arrange(DOWN, buff=0.20)
            change = self.chip("ONLY PUSH CHANGES", ORANGE)
            measure = self.chip("MEASURE DISTANCE", GREEN)
            return VGroup(keep, change, measure).arrange(DOWN, buff=0.28)
        if index == 9:
            wrong = self.note("FORCE HIDES INSIDE", RED)
            strike = Cross(wrong, stroke_color=RED, stroke_width=5)
            right = VGroup(self.note("FOOT PUSHES BALL", COBALT), self.note("MOTION CHANGES", GREEN)).arrange(DOWN, buff=0.24).shift(DOWN * 0.85)
            return VGroup(wrong.shift(UP * 0.70), strike.shift(UP * 0.70), right)
        if index == 10:
            return VGroup(self.step("E", "GAP STAYS VISIBLE", CYAN), self.step("E", "BOTH CARTS MOVE", GREEN), self.step("C", "NON-CONTACT PUSH", ORANGE)).arrange(DOWN, buff=0.22)
        return VGroup(self.step("1", "NAME THE PAIR", COBALT), self.step("2", "TOUCH OR NO TOUCH", ORANGE), self.step("3", "USE MOTION EVIDENCE", GREEN), self.note("COCKPIT CHECK READY", GOLD)).arrange(DOWN, buff=0.22)

    def chip(self, text, color, width=3.65):
        box = RoundedRectangle(width=width, height=0.64, corner_radius=0.14, stroke_color=color, stroke_width=3, fill_color="#FFFFFF", fill_opacity=0.96)
        label = Text(text, font_size=23, weight=BOLD, color=INK)
        if label.width > width - 0.42:
            label.scale_to_fit_width(width - 0.42)
        label.move_to(box)
        return VGroup(box, label)

    def note(self, text, color):
        label = Text(text, font_size=22, weight=BOLD, color=color)
        if label.width > 3.72:
            label.scale_to_fit_width(3.72)
        return label

    def object_token(self, text, color):
        circle = Circle(radius=0.48, color=color, stroke_width=5, fill_color="#FFFFFF", fill_opacity=0.96)
        label = Text(text, font_size=30, weight=BOLD, color=INK).move_to(circle)
        return VGroup(circle, label)

    def evidence(self, heading, detail, color):
        box = RoundedRectangle(width=1.92, height=1.25, corner_radius=0.16, stroke_color=color, stroke_width=3, fill_color="#FFFFFF", fill_opacity=0.96)
        head = Text(heading, font_size=21, weight=BOLD, color=color).move_to(box.get_center() + UP * 0.26)
        copy = Text(detail, font_size=16, weight=BOLD, color=INK)
        if copy.width > 1.58:
            copy.scale_to_fit_width(1.58)
        copy.move_to(box.get_center() + DOWN * 0.28)
        return VGroup(box, head, copy)

    def step(self, number, text, color):
        badge = Circle(radius=0.28, stroke_width=0, fill_color=color, fill_opacity=1)
        digit = Text(number, font_size=20, weight=BOLD, color=WHITE).move_to(badge)
        label = Text(text, font_size=19, weight=BOLD, color=INK)
        if label.width > 2.82:
            label.scale_to_fit_width(2.82)
        row = VGroup(VGroup(badge, digit), label).arrange(RIGHT, buff=0.22)
        panel = RoundedRectangle(width=4.0, height=0.66, corner_radius=0.14, stroke_color=color, stroke_width=2, fill_color="#FFFFFF", fill_opacity=0.96).move_to(row)
        row.move_to(panel)
        return VGroup(panel, row)

    def emphasis_for(self, focus, index):
        if not focus:
            return None
        target = focus[index % len(focus)]
        return Indicate(target, color=(ORANGE if index % 2 == 0 else COBALT), scale_factor=1.035)
