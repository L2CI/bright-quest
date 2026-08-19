import json
import os
from pathlib import Path

import numpy as np
from manim import *


INK = "#071827"
NAVY = "#0A2944"
BLUE = "#1265C9"
CYAN = "#45D6DF"
GOLD = "#FFC857"
ORANGE = "#FF8A5B"
VIOLET = "#6D4BEF"
MAGENTA = "#D83798"
GREEN = "#48C78E"
RED = "#F45B69"
CREAM = "#FFF8E8"
WHITE = "#FFFFFF"
GREY = "#AFC1D0"
BLACK = "#02080D"


class CinematicPhysicsBase(MovingCameraScene):
    chapter_number = 0
    accent = GOLD

    def construct(self):
        self.course_dir = Path(os.environ["BQ_PHYSICS_COURSE_DIR"])
        self.timeline = json.loads(Path(os.environ["BQ_TIMELINE_PATH"]).read_text(encoding="utf-8"))
        self.cue_list = self.timeline["cues"]
        self.captions = {}
        for caption in self.timeline["captionCues"]:
            self.captions.setdefault(caption["sourceCueId"], []).append(caption)
        self.assets = self.course_dir / "assets" / "source" / "cinematic-v2"
        self.scene_group = Group()
        self.active_focus = None
        self.header_group = self.header()
        self.add(self.header_group)
        self.render_chapter()
        self.wait_until(self.timeline["duration"])

    def render_chapter(self):
        raise NotImplementedError

    def wait_until(self, target):
        remaining = target - self.time
        if remaining > 0.001:
            self.wait(remaining)

    def header(self):
        rail = Rectangle(width=config.frame_width, height=0.48, stroke_width=0, fill_color=INK, fill_opacity=0.97).to_edge(UP, buff=0)
        brand = Text("BRIGHT QUEST  /  PHYSICS 101", font_size=16, weight=BOLD, color=WHITE).to_edge(LEFT, buff=0.34).shift(UP * 3.36)
        mission = Text(f"KINETIC WORKSHOP  //  {self.chapter_number:02d}", font_size=16, weight=BOLD, color=self.accent).to_edge(RIGHT, buff=0.34).shift(UP * 3.36)
        return VGroup(rail, brand, mission).set_z_index(200)

    def plate(self, filename, shade=0.10):
        image = ImageMobject(str(self.assets / filename)).set_width(config.frame_width).set_z_index(-100)
        veil = Rectangle(width=config.frame_width, height=config.frame_height, stroke_width=0, fill_color=INK, fill_opacity=shade).set_z_index(-90)
        return Group(image, veil)

    def title(self, number, text, accent=None):
        accent = accent or self.accent
        badge_text = Text(f"{number:02d}", font_size=18, weight=BOLD, color=INK)
        badge = RoundedRectangle(width=0.62, height=0.42, corner_radius=0.10, stroke_width=0, fill_color=accent, fill_opacity=1).move_to(badge_text)
        label = Text(text.upper(), font_size=22, weight=BOLD, color=WHITE)
        if label.width > 6.8:
            label.scale_to_fit_width(6.8)
        row = VGroup(VGroup(badge, badge_text), label).arrange(RIGHT, buff=0.18)
        shell = RoundedRectangle(width=row.width + 0.48, height=0.62, corner_radius=0.14, stroke_color=WHITE, stroke_width=1.4, fill_color=INK, fill_opacity=0.92).move_to(row)
        return VGroup(shell, row).move_to(LEFT * 3.0 + UP * 2.72).set_z_index(120)

    def chip(self, text, point, color=BLUE, width=None, size=20, dark=True):
        label = Text(text.upper(), font_size=size, weight=BOLD, color=WHITE if dark else INK)
        w = width or max(1.45, label.width + 0.48)
        if label.width > w - 0.32:
            label.scale_to_fit_width(w - 0.32)
        shell = RoundedRectangle(width=w, height=0.54, corner_radius=0.14, stroke_color=color, stroke_width=2.4, fill_color=INK if dark else CREAM, fill_opacity=0.93).move_to(label)
        return VGroup(shell, label).move_to(point).set_z_index(80)

    def card(self, title, point, width=3.3, height=1.65, color=BLUE):
        shell = RoundedRectangle(width=width, height=height, corner_radius=0.18, stroke_color=color, stroke_width=3, fill_color=INK, fill_opacity=0.86)
        label = Text(title.upper(), font_size=18, weight=BOLD, color=WHITE).move_to(shell.get_top() + DOWN * 0.30)
        return VGroup(shell, label).move_to(point).set_z_index(40)

    def evidence(self, text, point, color=GREEN, width=3.1):
        disc = Circle(radius=0.19, stroke_color=color, stroke_width=3, fill_color=color, fill_opacity=0.25)
        tick = VGroup(Line([-0.10, 0, 0], [-0.02, -0.09, 0], color=WHITE, stroke_width=5), Line([-0.02, -0.09, 0], [0.13, 0.11, 0], color=WHITE, stroke_width=5)).move_to(disc)
        return VGroup(VGroup(disc, tick), self.chip(text, ORIGIN, color, width=width, size=16)).arrange(RIGHT, buff=0.12).move_to(point).set_z_index(90)

    def force_arrow(self, start, end, label, color, dashed=False, label_shift=UP * 0.42):
        if dashed:
            arrow = DashedLine(start, end, dash_length=0.18, color=color, stroke_width=8)
            tip = Triangle(fill_color=color, fill_opacity=1, stroke_width=0).scale(0.14).rotate(-PI / 2).move_to(end)
            line_group = VGroup(arrow, tip)
        else:
            line_group = Arrow(start, end, buff=0, color=color, stroke_width=8, max_tip_length_to_length_ratio=0.18)
            line_group.set_background_stroke(color=BLACK, width=13, opacity=0.82)
        tag = self.chip(label, (np.array(start) + np.array(end)) / 2 + label_shift, color, width=2.45, size=14)
        return VGroup(line_group, tag).set_z_index(100)

    def cart(self, point, color=BLUE, scale=1.0):
        shadow = Ellipse(width=2.0, height=0.24, stroke_width=0, fill_color=BLACK, fill_opacity=0.34).shift(DOWN * 0.44)
        body = RoundedRectangle(width=1.8, height=0.62, corner_radius=0.16, stroke_color=WHITE, stroke_width=2.2, fill_color=color, fill_opacity=1).set_sheen(0.32, UL)
        deck = RoundedRectangle(width=1.35, height=0.15, corner_radius=0.05, stroke_width=0, fill_color=GOLD, fill_opacity=1).shift(UP * 0.13)
        wheels = VGroup(*[Circle(radius=0.20, stroke_color=WHITE, stroke_width=2, fill_color=INK, fill_opacity=1).shift(RIGHT * x + DOWN * 0.40) for x in (-0.58, 0.58)])
        hubs = VGroup(*[Dot(radius=0.07, color=GOLD).move_to(w) for w in wheels])
        return VGroup(shadow, body, deck, wheels, hubs).scale(scale).move_to(point).set_z_index(55)

    def shoe(self, point, color=BLUE, scale=1.0):
        sole = RoundedRectangle(width=2.3, height=0.44, corner_radius=0.18, stroke_color=WHITE, stroke_width=2, fill_color=CREAM, fill_opacity=1).shift(DOWN * 0.28)
        upper = Polygon([-1.0, -0.18, 0], [-0.72, 0.55, 0], [0.25, 0.65, 0], [1.0, 0.12, 0], [0.90, -0.18, 0], fill_color=color, fill_opacity=1, stroke_color=WHITE, stroke_width=2.4).set_sheen(0.25, UL)
        heel = RoundedRectangle(width=0.50, height=0.72, corner_radius=0.12, stroke_width=0, fill_color=INK, fill_opacity=0.34).shift(LEFT * 0.65 + UP * 0.06)
        laces = VGroup(*[Line([-0.28, y, 0], [0.38, y + 0.08, 0], color=GOLD, stroke_width=3) for y in (0.08, 0.22, 0.36)])
        return VGroup(sole, upper, heel, laces).scale(scale).move_to(point).set_z_index(60)

    def feather(self, point, scale=1.0):
        shaft = Line([0, -0.75, 0], [0, 0.76, 0], color=GOLD, stroke_width=4)
        vanes = VGroup()
        for y in np.linspace(-0.52, 0.56, 9):
            width = 0.48 * (1 - abs(y) / 0.8)
            vanes.add(Line([0, y, 0], [-width, y + 0.17, 0], color=WHITE, stroke_width=3))
            vanes.add(Line([0, y, 0], [width, y + 0.17, 0], color=WHITE, stroke_width=3))
        return VGroup(vanes, shaft).rotate(-0.12).scale(scale).move_to(point).set_z_index(62)

    def ball(self, point, radius=0.34, color=ORANGE):
        body = Circle(radius=radius, stroke_color=WHITE, stroke_width=2.4, fill_color=color, fill_opacity=1).set_sheen(0.42, UL)
        shine = Dot(radius=radius * 0.16, color=WHITE).shift(UL * radius * 0.52)
        return VGroup(body, shine).move_to(point).set_z_index(62)

    def bar_magnet(self, point, scale=1.0, flip=False):
        left_color, right_color = (BLUE, RED) if flip else (RED, BLUE)
        left = RoundedRectangle(width=1.35, height=0.70, corner_radius=0.12, stroke_color=WHITE, stroke_width=2, fill_color=left_color, fill_opacity=1).shift(LEFT * 0.64)
        right = RoundedRectangle(width=1.35, height=0.70, corner_radius=0.12, stroke_color=WHITE, stroke_width=2, fill_color=right_color, fill_opacity=1).shift(RIGHT * 0.64)
        join = Rectangle(width=0.20, height=0.70, stroke_width=0, fill_color=WHITE, fill_opacity=0.36)
        labels = VGroup(Text("N" if not flip else "S", font_size=22, weight=BOLD, color=WHITE).move_to(left), Text("S" if not flip else "N", font_size=22, weight=BOLD, color=WHITE).move_to(right))
        return VGroup(left, right, join, labels).scale(scale).move_to(point).set_z_index(60)

    def material_sample(self, kind, point):
        if kind == "steel":
            item = VGroup(*[Arc(radius=0.18, start_angle=0, angle=1.7 * PI, color=GREY, stroke_width=5).shift(RIGHT * i * 0.18) for i in range(3)])
        elif kind == "aluminium":
            item = Polygon([-0.45, -0.20, 0], [0.42, -0.26, 0], [0.34, 0.24, 0], [-0.38, 0.18, 0], fill_color=GREY, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
        elif kind == "copper":
            item = Circle(radius=0.28, fill_color="#C66A2B", fill_opacity=1, stroke_color=GOLD, stroke_width=3)
        else:
            item = Circle(radius=0.28, fill_color=BLUE, fill_opacity=1, stroke_color=WHITE, stroke_width=2)
            item.add(*[Dot(radius=0.045, color=INK).move_to(item.get_center() + v) for v in (UL * 0.09, UR * 0.09, DL * 0.09, DR * 0.09)])
        return item.move_to(point).set_z_index(62)

    def focus_on(self, target, color=None):
        color = color or self.accent
        new_focus = SurroundingRectangle(target, color=color, stroke_width=5, buff=0.10).set_z_index(110)
        if self.active_focus is None or self.active_focus not in self.mobjects:
            self.active_focus = new_focus
            self.scene_group.add(new_focus)
            return Create(new_focus)
        old = self.active_focus
        self.active_focus = new_focus
        self.scene_group.remove(old).add(new_focus)
        return ReplacementTransform(old, new_focus)

    def start_cue(self, index, plate_name, shade=0.10):
        cue = self.cue_list[index]
        self.wait_until(cue["start"])
        old = self.scene_group
        self.active_focus = None
        scene = Group(self.plate(plate_name, shade), self.title(index + 1, cue["title"]))
        self.scene_group = scene
        if len(old):
            self.play(FadeOut(old, shift=LEFT * 0.08), FadeIn(scene, shift=RIGHT * 0.08), run_time=0.34)
        else:
            # The opening apparatus must be visible on frame zero; a fade from
            # black delays the learner's first visual anchor under narration.
            self.add(scene)
            self.wait(0.34)
        return cue, scene

    def run_actions(self, cue, actions, focus_target=None):
        captions = self.captions.get(cue["id"], [])
        for index, caption in enumerate(captions):
            self.wait_until(caption["start"])
            action = actions[index] if index < len(actions) else None
            if callable(action):
                action = action()
            if action is None and focus_target is not None:
                action = self.focus_on(focus_target)
            if action is not None:
                self.play(action, run_time=0.52, rate_func=smooth)
        self.wait_until(cue["end"])

    def add_reveal(self, *objects, shift=UP * 0.06):
        for obj in objects:
            self.scene_group.add(obj)
        return AnimationGroup(*[FadeIn(obj, shift=shift) for obj in objects], lag_ratio=0.10)

    def verdict_pair(self, left, right, left_color=GREEN, right_color=ORANGE):
        return VGroup(self.chip(left, LEFT * 2.1 + DOWN * 2.35, left_color, width=3.35, size=18), self.chip(right, RIGHT * 2.1 + DOWN * 2.35, right_color, width=3.35, size=18))


class PhysicsChapter04Cinematic(CinematicPhysicsBase):
    chapter_number = 4
    accent = ORANGE

    def render_chapter(self):
        self.friction_prediction()
        self.friction_shoes()
        self.friction_carts()
        self.friction_model()
        self.friction_jobs()
        self.friction_data()
        self.friction_fair()
        self.friction_unfair()
        self.friction_design()
        self.friction_misconception()
        self.friction_correction()
        self.friction_exit()

    def friction_prediction(self):
        cue, scene = self.start_cue(0, "chapter-04-friction-hero.png", 0.03)
        ice = self.chip("smooth ice", RIGHT * 3.2 + DOWN * 1.95, CYAN, width=2.25)
        grip = self.chip("rough grip mat", LEFT * 3.15 + DOWN * 1.95, ORANGE, width=2.65)
        push_l = self.force_arrow(LEFT * 4.4 + DOWN * 0.85, LEFT * 2.8 + DOWN * 0.85, "same push", GOLD, label_shift=UP * 0.38)
        push_r = self.force_arrow(RIGHT * 1.7 + DOWN * 0.85, RIGHT * 3.3 + DOWN * 0.85, "same push", GOLD, label_shift=UP * 0.38)
        question = self.chip("Which slides farther?", DOWN * 2.72, GOLD, width=4.2, size=22)
        actions = [lambda: self.add_reveal(grip), lambda: self.add_reveal(ice), lambda: self.add_reveal(push_l, push_r), lambda: self.focus_on(grip), lambda: self.focus_on(ice), lambda: self.add_reveal(question)]
        self.run_actions(cue, actions, question)

    def friction_shoes(self):
        cue, scene = self.start_cue(1, "chapter-04-friction-empty.png", 0.08)
        left = self.shoe(LEFT * 3.1 + DOWN * 0.75, scale=0.82)
        right = self.shoe(RIGHT * 2.1 + DOWN * 0.75, scale=0.82)
        left_tag = self.chip("grips", LEFT * 3.0 + DOWN * 2.15, GREEN, width=1.7)
        right_tag = self.chip("slips", RIGHT * 3.15 + DOWN * 2.15, ORANGE, width=1.7)
        trace = DashedLine(RIGHT * 1.7 + DOWN * 1.36, RIGHT * 4.8 + DOWN * 1.36, dash_length=0.18, color=ORANGE, stroke_width=6)
        contact_l = SurroundingRectangle(left[0], color=GREEN, stroke_width=5, buff=0.06)
        contact_r = SurroundingRectangle(right[0], color=ORANGE, stroke_width=5, buff=0.06)
        friction = self.force_arrow(RIGHT * 3.4 + DOWN * 0.65, RIGHT * 2.0 + DOWN * 0.65, "surface on shoe", ORANGE)
        scene.add(left, right)
        self.add(left, right)
        actions = [lambda: AnimationGroup(left.animate.shift(RIGHT * 0.28), right.animate.shift(RIGHT * 2.05), rate_func=rate_functions.ease_out_cubic), lambda: self.add_reveal(trace), lambda: self.add_reveal(left_tag, right_tag), lambda: self.add_reveal(contact_l, contact_r), lambda: self.add_reveal(friction)]
        self.run_actions(cue, actions, friction)

    def friction_carts(self):
        cue, scene = self.start_cue(2, "chapter-04-friction-empty.png", 0.18)
        tile = RoundedRectangle(width=10.8, height=0.78, corner_radius=0.15, stroke_color=CYAN, stroke_width=3, fill_color=CREAM, fill_opacity=0.83).move_to(UP * 0.55)
        mat = RoundedRectangle(width=10.8, height=0.78, corner_radius=0.15, stroke_color=ORANGE, stroke_width=3, fill_color=ORANGE, fill_opacity=0.30).move_to(DOWN * 1.15)
        cart_a = self.cart(LEFT * 4.6 + UP * 0.62, scale=0.72)
        cart_b = self.cart(LEFT * 4.6 + DOWN * 1.08, scale=0.72)
        start = DashedLine(LEFT * 4.0 + UP * 1.1, LEFT * 4.0 + DOWN * 1.65, color=GOLD, stroke_width=4)
        labels = VGroup(self.chip("tile", LEFT * 4.9 + UP * 1.55, CYAN, width=1.4, size=15), self.chip("textured mat", LEFT * 4.55 + DOWN * 2.06, ORANGE, width=2.2, size=15))
        stop_a = Line(RIGHT * 4.4 + UP * 0.18, RIGHT * 4.4 + UP * 0.98, color=CYAN, stroke_width=7)
        stop_b = Line(RIGHT * 0.5 + DOWN * 1.55, RIGHT * 0.5 + DOWN * 0.75, color=ORANGE, stroke_width=7)
        verdicts = self.verdict_pair("rolls farther", "stops sooner", CYAN, ORANGE)
        scene.add(tile, mat, start, labels, cart_a, cart_b)
        self.add(tile, mat, start, labels, cart_a, cart_b)
        actions = [lambda: AnimationGroup(cart_a.animate.shift(RIGHT * 8.0), cart_b.animate.shift(RIGHT * 4.1), run_time=1.05, rate_func=rate_functions.ease_out_quart), lambda: self.add_reveal(stop_a, stop_b), lambda: self.add_reveal(verdicts[0]), lambda: self.add_reveal(verdicts[1]), lambda: self.focus_on(VGroup(stop_a, stop_b))]
        self.run_actions(cue, actions, verdicts)

    def friction_model(self):
        cue, scene = self.start_cue(3, "chapter-04-friction-empty.png", 0.34)
        wheel = VGroup(Circle(radius=1.1, stroke_color=WHITE, stroke_width=4, fill_color=INK, fill_opacity=1), Circle(radius=0.42, stroke_color=GOLD, stroke_width=5), Dot(radius=0.13, color=WHITE)).move_to(LEFT * 1.4 + UP * 0.25)
        mat = Rectangle(width=7.6, height=0.58, stroke_color=ORANGE, stroke_width=3, fill_color=ORANGE, fill_opacity=0.68).move_to(DOWN * 1.08)
        for x in np.linspace(-3.6, 3.6, 28):
            mat.add(Line([x, -1.34, 0], [x + 0.10, -0.82, 0], color=GOLD, stroke_width=2))
        patch = Ellipse(width=0.92, height=0.24, stroke_color=GOLD, stroke_width=6, fill_color=GOLD, fill_opacity=0.24).move_to(LEFT * 1.4 + DOWN * 0.85)
        motion = self.force_arrow(LEFT * 0.8 + UP * 1.8, RIGHT * 2.1 + UP * 1.8, "cart motion", CYAN)
        friction = self.force_arrow(LEFT * 0.9 + DOWN * 0.22, LEFT * 3.5 + DOWN * 0.22, "mat on cart", ORANGE)
        contact = self.chip("touching surfaces", RIGHT * 2.8 + DOWN * 1.10, GOLD, width=2.9)
        stored = self.chip("not stored inside", RIGHT * 2.7 + UP * 0.15, RED, width=2.8)
        cross = VGroup(Line(stored.get_corner(UL), stored.get_corner(DR), color=RED, stroke_width=7), Line(stored.get_corner(UR), stored.get_corner(DL), color=RED, stroke_width=7)).set_z_index(110)
        scene.add(wheel, mat)
        self.add(wheel, mat)
        actions = [lambda: self.add_reveal(patch), lambda: self.add_reveal(motion), lambda: self.add_reveal(friction), lambda: self.add_reveal(contact), lambda: self.add_reveal(stored, cross)]
        self.run_actions(cue, actions, friction)

    def friction_jobs(self):
        cue, scene = self.start_cue(4, "chapter-04-friction-empty.png", 0.28)
        help_card = self.card("helps grip", LEFT * 2.7, width=4.6, height=3.4, color=GREEN)
        hinder_card = self.card("hinders coasting", RIGHT * 2.7, width=4.6, height=3.4, color=ORANGE)
        foot = self.shoe(LEFT * 2.7 + DOWN * 0.25, scale=0.74)
        cart = self.cart(RIGHT * 2.7 + DOWN * 0.25, scale=0.76)
        ground = Line(LEFT * 4.5 + DOWN * 1.10, LEFT * 0.9 + DOWN * 1.10, color=GREEN, stroke_width=10)
        slow = self.force_arrow(RIGHT * 3.2 + DOWN * 1.15, RIGHT * 1.2 + DOWN * 1.15, "surface on cart", ORANGE)
        question = self.chip("What is the job?", DOWN * 2.45, GOLD, width=3.4)
        scene.add(help_card, hinder_card)
        self.add(help_card, hinder_card)
        actions = [lambda: self.add_reveal(foot, ground), lambda: self.add_reveal(cart), lambda: self.add_reveal(slow), lambda: self.focus_on(help_card), lambda: self.focus_on(hinder_card), lambda: self.add_reveal(question)]
        self.run_actions(cue, actions, question)

    def friction_data(self):
        cue, scene = self.start_cue(5, "chapter-04-friction-empty.png", 0.42)
        axes = Axes(x_range=[0, 2, 1], y_range=[0, 360, 60], x_length=5.2, y_length=4.0, tips=False, axis_config={"color": WHITE, "stroke_width": 3}).move_to(RIGHT * 1.0 + DOWN * 0.15)
        tile_bar = Rectangle(width=1.45, height=3.40, stroke_width=0, fill_color=CYAN, fill_opacity=0.95).align_to(axes.c2p(0.7, 0), DOWN).move_to(axes.c2p(0.7, 170), coor_mask=[1, 1, 0])
        mat_bar = Rectangle(width=1.45, height=1.20, stroke_width=0, fill_color=ORANGE, fill_opacity=0.95).align_to(axes.c2p(1.45, 0), DOWN).move_to(axes.c2p(1.45, 60), coor_mask=[1, 1, 0])
        tile_runs = self.chip("338  342  340 cm", LEFT * 3.5 + UP * 0.55, CYAN, width=3.2, size=17)
        mat_runs = self.chip("118  122  120 cm", LEFT * 3.5 + DOWN * 0.35, ORANGE, width=3.2, size=17)
        labels = VGroup(self.chip("tile", RIGHT * 0.0 + DOWN * 2.35, CYAN, width=1.3, size=14), self.chip("mat", RIGHT * 2.0 + DOWN * 2.35, ORANGE, width=1.3, size=14))
        result = self.evidence("mat: greater slowing", LEFT * 2.9 + DOWN * 1.55, ORANGE, width=3.3)
        scene.add(axes)
        self.add(axes)
        actions = [lambda: self.add_reveal(tile_runs), lambda: self.add_reveal(mat_runs), lambda: self.add_reveal(tile_bar, mat_bar), lambda: self.add_reveal(labels), lambda: self.add_reveal(result)]
        self.run_actions(cue, actions, result)

    def friction_fair(self):
        cue, scene = self.start_cue(6, "chapter-04-friction-empty.png", 0.34)
        names = [("same cart", BLUE), ("same wheels", CYAN), ("same start", GOLD), ("same entry speed", GREEN), ("change surface", ORANGE), ("repeat x3", VIOLET)]
        chips = VGroup(*[self.chip(text, ORIGIN, color, width=2.55, size=16) for text, color in names]).arrange_in_grid(rows=2, cols=3, buff=(0.30, 0.45)).move_to(DOWN * 0.15)
        ruler_line = NumberLine(x_range=[0, 5, 1], length=8.8, include_numbers=False, color=WHITE).move_to(DOWN * 2.05)
        ruler_labels = VGroup(*[
            Text(str(value), font_size=20, color=WHITE).next_to(ruler_line.n2p(value), DOWN, buff=0.12)
            for value in range(6)
        ])
        ruler = VGroup(ruler_line, ruler_labels)
        entry = self.chip("measure from entry line", DOWN * 2.72, GOLD, width=3.8)
        actions = [lambda i=i: self.add_reveal(chips[i]) for i in range(5)] + [lambda: self.add_reveal(chips[5], ruler, entry)]
        self.run_actions(cue, actions, chips)

    def friction_unfair(self):
        cue, scene = self.start_cue(7, "chapter-04-friction-empty.png", 0.38)
        left = self.card("trial A", LEFT * 2.65, width=4.5, height=3.2, color=CYAN)
        right = self.card("trial B", RIGHT * 2.65, width=4.5, height=3.2, color=RED)
        heavy = self.cart(LEFT * 2.65 + DOWN * 0.1, scale=0.84)
        light = self.cart(RIGHT * 2.65 + DOWN * 0.1, color=CYAN, scale=0.58)
        changes = VGroup(self.chip("heavy / light", LEFT * 2.65 + DOWN * 1.15, RED, width=2.3, size=15), self.chip("hard / gentle push", RIGHT * 2.65 + DOWN * 1.15, RED, width=2.7, size=15), self.chip("tile / carpet", DOWN * 2.15, RED, width=2.4, size=15))
        verdict = self.chip("cannot isolate the surface", DOWN * 2.78, RED, width=4.5, size=19)
        scene.add(left, right, heavy, light)
        self.add(left, right, heavy, light)
        actions = [lambda: self.add_reveal(changes[0]), lambda: self.add_reveal(changes[1]), lambda: self.add_reveal(changes[2]), lambda: self.focus_on(left, RED), lambda: self.focus_on(right, RED), lambda: self.add_reveal(verdict)]
        self.run_actions(cue, actions, verdict)

    def friction_design(self):
        cue, scene = self.start_cue(8, "chapter-04-friction-empty.png", 0.34)
        brake = self.card("brake pads", LEFT * 3.4 + UP * 0.15, width=3.0, height=2.7, color=GREEN)
        tyre = self.card("tyres", ORIGIN + UP * 0.15, width=3.0, height=2.7, color=GREEN)
        axle = self.card("wheel axle", RIGHT * 3.4 + UP * 0.15, width=3.0, height=2.7, color=CYAN)
        grip = self.chip("increase grip", LEFT * 1.9 + DOWN * 1.65, GREEN, width=2.8)
        easy = self.chip("reduce unwanted friction", RIGHT * 1.9 + DOWN * 1.65, CYAN, width=3.5)
        guide = self.chip("design for the job", DOWN * 2.55, GOLD, width=3.6)
        actions = [lambda: self.add_reveal(brake), lambda: self.add_reveal(tyre), lambda: self.add_reveal(axle), lambda: self.add_reveal(grip), lambda: self.add_reveal(easy), lambda: self.add_reveal(guide)]
        self.run_actions(cue, actions, guide)

    def friction_misconception(self):
        cue, scene = self.start_cue(9, "chapter-04-friction-empty.png", 0.30)
        claim = self.chip("friction is always bad", UP * 1.55, RED, width=4.5, size=22)
        shoe = self.shoe(LEFT * 2.0 + DOWN * 0.35, scale=0.95)
        slip = DashedLine(LEFT * 2.9 + DOWN * 1.15, RIGHT * 2.0 + DOWN * 1.15, color=ORANGE, stroke_width=7)
        body = VGroup(Circle(radius=0.30, color=CREAM, fill_opacity=1), Line([0, -0.3, 0], [0, -1.35, 0], color=CREAM, stroke_width=10), Line([0, -0.65, 0], [-0.75, -1.1, 0], color=CREAM, stroke_width=8), Line([0, -0.65, 0], [0.75, -1.1, 0], color=CREAM, stroke_width=8)).move_to(RIGHT * 2.2 + UP * 0.1)
        cross = VGroup(Line(claim.get_corner(UL), claim.get_corner(DR), color=RED, stroke_width=8), Line(claim.get_corner(UR), claim.get_corner(DL), color=RED, stroke_width=8)).set_z_index(110)
        result = self.evidence("grip makes the push possible", DOWN * 2.25, GREEN, width=4.2)
        actions = [lambda: self.add_reveal(claim), lambda: self.add_reveal(shoe), lambda: self.add_reveal(slip), lambda: self.add_reveal(body), lambda: self.add_reveal(cross), lambda: self.add_reveal(result)]
        self.run_actions(cue, actions, result)

    def friction_correction(self):
        cue, scene = self.start_cue(10, "chapter-04-friction-empty.png", 0.38)
        claim = self.chip("friction can help or hinder", UP * 1.55, GREEN, width=5.3, size=22)
        evidence_items = VGroup(self.evidence("stopping distance", LEFT * 3.0 + UP * 0.15, CYAN), self.evidence("slipping distance", RIGHT * 3.0 + UP * 0.15, ORANGE), self.evidence("repeat fair trials", DOWN * 1.05, VIOLET)).set_z_index(90)
        flow = VGroup(self.chip("job", LEFT * 3.0 + DOWN * 2.2, GOLD, width=1.5), Arrow(LEFT * 2.1 + DOWN * 2.2, LEFT * 0.7 + DOWN * 2.2, color=GOLD, stroke_width=6), self.chip("evidence", DOWN * 2.2, CYAN, width=1.9), Arrow(RIGHT * 0.9 + DOWN * 2.2, RIGHT * 2.2 + DOWN * 2.2, color=GOLD, stroke_width=6), self.chip("claim", RIGHT * 3.1 + DOWN * 2.2, GREEN, width=1.6))
        actions = [lambda: self.add_reveal(claim), lambda: self.add_reveal(evidence_items[0]), lambda: self.add_reveal(evidence_items[1]), lambda: self.add_reveal(evidence_items[2]), lambda: self.add_reveal(flow)]
        self.run_actions(cue, actions, flow)

    def friction_exit(self):
        cue, scene = self.start_cue(11, "chapter-04-friction-empty.png", 0.20)
        a = self.shoe(LEFT * 2.6 + UP * 0.25, scale=0.82)
        b = self.shoe(RIGHT * 2.6 + UP * 0.25, color=CYAN, scale=0.82)
        a_bar = Rectangle(width=3.9, height=0.40, stroke_width=0, fill_color=ORANGE, fill_opacity=1).move_to(LEFT * 2.2 + DOWN * 1.05)
        b_bar = Rectangle(width=1.35, height=0.40, stroke_width=0, fill_color=GREEN, fill_opacity=1).move_to(RIGHT * 1.0 + DOWN * 1.05)
        a_label = self.chip("A: 70 cm slip", LEFT * 2.6 + DOWN * 1.70, ORANGE, width=2.5)
        b_label = self.chip("B: 24 cm slip", RIGHT * 2.6 + DOWN * 1.70, GREEN, width=2.5)
        question = self.chip("Which sole gives useful grip?", DOWN * 2.60, GOLD, width=5.3, size=21)
        actions = [lambda: self.add_reveal(a, b), lambda: self.add_reveal(a_bar), lambda: self.add_reveal(a_label), lambda: self.add_reveal(b_bar), lambda: self.add_reveal(b_label, question)]
        self.run_actions(cue, actions, question)


class PhysicsChapter05Cinematic(CinematicPhysicsBase):
    chapter_number = 5
    accent = VIOLET

    def render_chapter(self):
        self.gravity_prediction()
        self.gravity_air_drop()
        self.gravity_vacuum_question()
        self.gravity_earth_pull()
        self.gravity_air_resistance()
        self.gravity_vacuum_drop()
        self.gravity_direction()
        self.gravity_fair()
        self.gravity_float()
        self.gravity_misconception()
        self.gravity_correction()
        self.gravity_exit()

    def gravity_prediction(self):
        cue, scene = self.start_cue(0, "chapter-05-gravity-hero.png", 0.03)
        equal = DashedLine(LEFT * 2.4 + UP * 0.85, RIGHT * 2.1 + UP * 0.85, color=GOLD, stroke_width=5)
        height = self.chip("same starting height", UP * 1.32, GOLD, width=3.3)
        choices = self.verdict_pair("ball first?", "feather first?", ORANGE, CYAN)
        why = self.chip("Predict what causes the difference", DOWN * 2.65, VIOLET, width=5.2, size=20)
        locks = VGroup(self.chip("same objects", LEFT * 2.5 + DOWN * 1.45, BLUE, width=2.1, size=15), self.chip("same release", ORIGIN + DOWN * 1.45, BLUE, width=2.1, size=15), self.chip("change the air", RIGHT * 2.5 + DOWN * 1.45, ORANGE, width=2.2, size=15))
        actions = [lambda: self.add_reveal(equal, height), lambda: self.add_reveal(choices[0]), lambda: self.add_reveal(choices[1]), lambda: self.add_reveal(why), lambda: self.add_reveal(locks)]
        self.run_actions(cue, actions, why)

    def gravity_air_drop(self):
        cue, scene = self.start_cue(1, "chapter-05-gravity-empty.png", 0.12)
        ball = self.ball(LEFT * 1.8 + UP * 1.15, 0.34)
        feather = self.feather(RIGHT * 1.6 + UP * 1.15, 0.78)
        floor = Line(LEFT * 4.4 + DOWN * 2.25, RIGHT * 4.4 + DOWN * 2.25, color=GOLD, stroke_width=8)
        air = VGroup(*[ArcBetweenPoints(RIGHT * 0.4 + UP * y, RIGHT * 3.4 + UP * (y + 0.2), angle=0.35, color=CYAN, stroke_width=3, stroke_opacity=0.62) for y in (-0.8, -0.1, 0.6, 1.3)])
        ball_land = self.chip("ball lands first", LEFT * 2.2 + DOWN * 1.65, ORANGE, width=2.8)
        feather_drift = self.chip("feather drifts", RIGHT * 2.2 + DOWN * 0.55, CYAN, width=2.6)
        caution = self.chip("observation is not the whole explanation", DOWN * 2.75, GOLD, width=6.2, size=18)
        scene.add(ball, feather, floor)
        self.add(ball, feather, floor)
        actions = [lambda: AnimationGroup(ball.animate.shift(DOWN * 3.05), feather.animate.shift(DOWN * 1.65 + RIGHT * 0.35), run_time=1.05, rate_func=rate_functions.ease_in_quad), lambda: self.add_reveal(ball_land), lambda: self.add_reveal(air), lambda: self.add_reveal(feather_drift), lambda: self.add_reveal(caution), lambda: self.focus_on(air, CYAN)]
        self.run_actions(cue, actions, air)

    def gravity_vacuum_question(self):
        cue, scene = self.start_cue(2, "chapter-05-gravity-empty.png", 0.06)
        gauge = VGroup(Circle(radius=0.58, stroke_color=WHITE, stroke_width=4, fill_color=INK, fill_opacity=0.88), Line(ORIGIN, UP * 0.42, color=GOLD, stroke_width=6)).move_to(RIGHT * 4.2 + UP * 1.25)
        air_dots = VGroup(*[Dot(radius=0.055, color=CYAN).move_to([x, y, 0]) for x, y in [(-2, 1), (-1, 0.2), (0, 1.2), (1.5, 0), (2, 1.4), (-1.7, -0.8), (1, -1)]])
        vacuum = self.chip("vacuum: almost no air", DOWN * 2.05, VIOLET, width=4.0)
        locks = VGroup(self.chip("same height", LEFT * 3.2 + DOWN * 2.75, BLUE, width=2.0, size=15), self.chip("same release", ORIGIN + DOWN * 2.75, BLUE, width=2.0, size=15), self.chip("change air", RIGHT * 3.2 + DOWN * 2.75, ORANGE, width=1.9, size=15))
        question = self.chip("What should happen?", UP * 1.9, GOLD, width=3.4)
        actions = [lambda: self.add_reveal(air_dots), lambda: FadeOut(air_dots, scale=0.65), lambda: gauge[1].animate.rotate(-1.30, about_point=gauge.get_center()), lambda: self.add_reveal(vacuum), lambda: self.add_reveal(question, locks)]
        scene.add(gauge)
        self.add(gauge)
        self.run_actions(cue, actions, question)

    def gravity_earth_pull(self):
        cue, scene = self.start_cue(3, "chapter-05-gravity-empty.png", 0.38)
        earth = Circle(radius=1.35, stroke_color=WHITE, stroke_width=4, fill_color=BLUE, fill_opacity=1).set_sheen(0.35, UL).move_to(DOWN * 1.0)
        land = VGroup(*[Arc(radius=0.45, start_angle=a, angle=0.9, color=GREEN, stroke_width=10) for a in (0.2, 2.0, 4.0)]).move_to(earth)
        ball = self.ball(LEFT * 2.2 + UP * 1.5, 0.30)
        feather = self.feather(RIGHT * 2.2 + UP * 1.5, 0.62)
        ball_arrow = self.force_arrow(ball.get_bottom(), earth.get_top() + LEFT * 0.55, "Earth on ball", VIOLET, label_shift=LEFT * 0.20)
        feather_arrow = self.force_arrow(feather.get_bottom(), earth.get_top() + RIGHT * 0.55, "Earth on feather", VIOLET, label_shift=RIGHT * 0.20)
        noncontact = self.chip("no contact needed", UP * 2.10, VIOLET, width=3.2)
        scene.add(earth, land, ball, feather)
        self.add(earth, land, ball, feather)
        actions = [lambda: self.add_reveal(noncontact), lambda: self.add_reveal(ball_arrow), lambda: self.add_reveal(feather_arrow), lambda: self.focus_on(ball_arrow, VIOLET), lambda: self.focus_on(feather_arrow, VIOLET)]
        self.run_actions(cue, actions, VGroup(ball_arrow, feather_arrow))

    def gravity_air_resistance(self):
        cue, scene = self.start_cue(4, "chapter-05-gravity-empty.png", 0.34)
        feather = self.feather(ORIGIN + UP * 0.25, 1.15)
        particles = VGroup(*[Dot(radius=0.065, color=CYAN).move_to([x, y, 0]) for x, y in [(-2.4, 1.2), (-1.8, 0.2), (-2.2, -1.0), (2.2, 1.0), (1.8, 0.0), (2.4, -1.1), (-1.2, 1.7), (1.2, 1.7)]])
        gravity = self.force_arrow(LEFT * 0.55 + DOWN * 0.20, LEFT * 0.55 + DOWN * 2.2, "Earth on feather", VIOLET, label_shift=LEFT * 1.15)
        resistance = self.force_arrow(RIGHT * 0.55 + DOWN * 0.30, RIGHT * 0.55 + UP * 1.65, "air on feather", ORANGE, dashed=True, label_shift=RIGHT * 1.25)
        contact = self.chip("air touches moving feather", DOWN * 2.55, CYAN, width=4.4)
        scene.add(feather, particles)
        self.add(feather, particles)
        actions = [lambda: particles.animate.shift(UP * 0.35), lambda: self.add_reveal(gravity), lambda: self.add_reveal(resistance), lambda: self.focus_on(feather), lambda: self.add_reveal(contact)]
        self.run_actions(cue, actions, VGroup(gravity, resistance))

    def gravity_vacuum_drop(self):
        cue, scene = self.start_cue(5, "chapter-05-gravity-empty.png", 0.04)
        ball = self.ball(LEFT * 1.75 + UP * 1.35, 0.34)
        feather = self.feather(RIGHT * 1.55 + UP * 1.35, 0.78)
        level = DashedLine(LEFT * 2.4 + UP * 1.35, RIGHT * 2.3 + UP * 1.35, color=GOLD, stroke_width=5)
        floor = Line(LEFT * 3.3 + DOWN * 2.15, RIGHT * 3.3 + DOWN * 2.15, color=GOLD, stroke_width=7)
        together = self.evidence("land together", DOWN * 2.62, GREEN, width=2.8)
        no_air = self.chip("almost no air resistance", UP * 2.08, VIOLET, width=4.0)
        comparison = VGroup(self.chip("open air: different", LEFT * 2.4 + DOWN * 1.55, ORANGE, width=3.0, size=16), self.chip("vacuum: together", RIGHT * 2.4 + DOWN * 1.55, GREEN, width=3.0, size=16))
        scene.add(ball, feather, level, floor)
        self.add(ball, feather, level, floor)
        actions = [lambda: self.add_reveal(no_air), lambda: AnimationGroup(ball.animate.shift(DOWN * 3.18), feather.animate.shift(DOWN * 3.18), run_time=1.18, rate_func=rate_functions.ease_in_quad), lambda: self.add_reveal(together), lambda: self.add_reveal(comparison[0]), lambda: self.add_reveal(comparison[1]), lambda: self.focus_on(together, GREEN)]
        self.run_actions(cue, actions, together)

    def gravity_direction(self):
        cue, scene = self.start_cue(6, "chapter-05-gravity-empty.png", 0.44)
        earth = Circle(radius=1.75, stroke_color=WHITE, stroke_width=4, fill_color=BLUE, fill_opacity=1).set_sheen(0.30, UL)
        objects = VGroup(*[self.ball(point, 0.20, color) for point, color in [([0, 2.5, 0], ORANGE), ([3.0, 0, 0], CYAN), ([0, -2.5, 0], GOLD), ([-3.0, 0, 0], GREEN)]])
        arrows = VGroup(*[Arrow(obj.get_center(), earth.get_center() + normalize(obj.get_center() - earth.get_center()) * 1.55, buff=0.20, color=VIOLET, stroke_width=7) for obj in objects])
        centre = Dot(radius=0.12, color=GOLD)
        label = self.chip("towards Earth's centre", UP * 2.55, VIOLET, width=3.9)
        scene.add(earth, objects)
        self.add(earth, objects)
        actions = [lambda: self.add_reveal(centre), lambda: self.add_reveal(arrows[0]), lambda: self.add_reveal(arrows[1]), lambda: self.add_reveal(arrows[2]), lambda: self.add_reveal(arrows[3], label)]
        self.run_actions(cue, actions, earth)

    def gravity_fair(self):
        cue, scene = self.start_cue(7, "chapter-05-gravity-empty.png", 0.34)
        labels = ["same ball", "same feather", "same chamber", "same height", "same release", "change air", "repeat drops", "keep shape"]
        colors = [BLUE, BLUE, BLUE, GOLD, GOLD, ORANGE, GREEN, VIOLET]
        chips = VGroup(*[self.chip(t, ORIGIN, c, width=2.35, size=15) for t, c in zip(labels, colors)]).arrange_in_grid(rows=2, cols=4, buff=(0.22, 0.42)).move_to(DOWN * 0.10)
        heading = self.chip("one planned change", UP * 1.78, ORANGE, width=3.4)
        actions = [lambda: self.add_reveal(heading)] + [lambda i=i: self.add_reveal(chips[i]) for i in range(4)] + [lambda: self.add_reveal(VGroup(*chips[4:]))]
        self.run_actions(cue, actions, chips)

    def gravity_float(self):
        cue, scene = self.start_cue(8, "chapter-05-gravity-empty.png", 0.38)
        balloon = VGroup(Circle(radius=0.90, stroke_color=WHITE, stroke_width=3, fill_color=GOLD, fill_opacity=1).set_sheen(0.35, UL), Triangle(fill_color=GOLD, fill_opacity=1, stroke_width=0).scale(0.14).rotate(PI).shift(DOWN * 0.95), Line([0, -1.05, 0], [0, -2.0, 0], color=WHITE, stroke_width=2)).move_to(ORIGIN + UP * 0.55)
        gravity = self.force_arrow(LEFT * 0.40 + UP * 0.15, LEFT * 0.40 + DOWN * 2.15, "Earth on balloon", VIOLET, label_shift=LEFT * 1.35)
        air = self.force_arrow(RIGHT * 0.40 + DOWN * 0.85, RIGHT * 0.40 + UP * 1.90, "air on balloon", CYAN, label_shift=RIGHT * 1.30)
        motion = self.chip("rising motion", UP * 2.30, GREEN, width=2.5)
        truth = self.evidence("gravity still acts", DOWN * 2.55, VIOLET, width=2.9)
        scene.add(balloon)
        self.add(balloon)
        actions = [lambda: balloon.animate.shift(UP * 0.35), lambda: self.add_reveal(motion), lambda: self.add_reveal(gravity), lambda: self.add_reveal(air), lambda: self.add_reveal(truth)]
        self.run_actions(cue, actions, VGroup(gravity, air))

    def gravity_misconception(self):
        cue, scene = self.start_cue(9, "chapter-05-gravity-empty.png", 0.14)
        claim = self.chip("gravity needs air", UP * 2.0, RED, width=3.6, size=23)
        ball = self.ball(LEFT * 1.5 + UP * 0.75, 0.32)
        feather = self.feather(RIGHT * 1.4 + UP * 0.75, 0.70)
        arrows = VGroup(self.force_arrow(ball.get_bottom(), ball.get_bottom() + DOWN * 1.45, "Earth on ball", VIOLET, label_shift=LEFT * 1.0), self.force_arrow(feather.get_bottom(), feather.get_bottom() + DOWN * 1.45, "Earth on feather", VIOLET, label_shift=RIGHT * 1.0))
        cross = VGroup(Line(claim.get_corner(UL), claim.get_corner(DR), color=RED, stroke_width=8), Line(claim.get_corner(UR), claim.get_corner(DL), color=RED, stroke_width=8)).set_z_index(115)
        result = self.evidence("still fall in a vacuum", DOWN * 2.35, GREEN, width=3.6)
        scene.add(ball, feather)
        self.add(ball, feather)
        actions = [lambda: self.add_reveal(claim), lambda: self.add_reveal(arrows), lambda: AnimationGroup(ball.animate.shift(DOWN * 1.15), feather.animate.shift(DOWN * 1.15)), lambda: self.add_reveal(cross), lambda: self.add_reveal(result)]
        self.run_actions(cue, actions, result)

    def gravity_correction(self):
        cue, scene = self.start_cue(10, "chapter-05-gravity-empty.png", 0.38)
        earth_q = self.card("Is Earth pulling?", LEFT * 2.65, width=4.5, height=3.3, color=VIOLET)
        air_q = self.card("Is air touching?", RIGHT * 2.65, width=4.5, height=3.3, color=ORANGE)
        earth_yes = self.evidence("yes near Earth", LEFT * 2.65 + DOWN * 0.20, VIOLET, width=2.8)
        air_yes = self.evidence("only when air is present", RIGHT * 2.65 + DOWN * 0.20, ORANGE, width=3.4)
        open_air = self.chip("open air: two interactions", LEFT * 2.45 + DOWN * 1.25, CYAN, width=3.5, size=16)
        vacuum = self.chip("vacuum: Earth still pulls", RIGHT * 2.45 + DOWN * 1.25, GREEN, width=3.6, size=16)
        guide = self.chip("keep the forces separate", DOWN * 2.55, GOLD, width=4.0)
        scene.add(earth_q, air_q)
        self.add(earth_q, air_q)
        actions = [lambda: self.add_reveal(earth_yes), lambda: self.add_reveal(air_yes), lambda: self.add_reveal(open_air), lambda: self.add_reveal(vacuum), lambda: self.add_reveal(guide), lambda: self.focus_on(VGroup(earth_q, air_q), GOLD), lambda: self.focus_on(guide, GOLD)]
        self.run_actions(cue, actions, guide)

    def gravity_exit(self):
        cue, scene = self.start_cue(11, "chapter-05-gravity-empty.png", 0.32)
        flat = RoundedRectangle(width=2.2, height=0.18, corner_radius=0.05, stroke_color=WHITE, stroke_width=2, fill_color=CREAM, fill_opacity=1).move_to(LEFT * 2.2 + UP * 0.85)
        crumpled = Circle(radius=0.45, stroke_color=WHITE, stroke_width=3, fill_color=CREAM, fill_opacity=1).move_to(RIGHT * 2.2 + UP * 0.85)
        air_arrows = VGroup(*[self.force_arrow(start, end, "air resistance", ORANGE, dashed=True, label_shift=LEFT * 1.3) for start, end in [(LEFT * 2.2 + UP * 0.45, LEFT * 2.2 + UP * 1.55)]])
        gravity = VGroup(self.force_arrow(LEFT * 2.2 + UP * 0.45, LEFT * 2.2 + DOWN * 1.20, "Earth on paper", VIOLET, label_shift=LEFT * 1.1), self.force_arrow(RIGHT * 2.2 + UP * 0.35, RIGHT * 2.2 + DOWN * 1.30, "Earth on paper", VIOLET, label_shift=RIGHT * 1.1))
        vacuum = self.chip("in a vacuum: what changes?", DOWN * 2.45, GOLD, width=4.7, size=21)
        scene.add(flat, crumpled)
        self.add(flat, crumpled)
        actions = [lambda: self.add_reveal(gravity), lambda: self.add_reveal(air_arrows), lambda: self.focus_on(flat, ORANGE), lambda: self.focus_on(crumpled, VIOLET), lambda: self.add_reveal(vacuum)]
        self.run_actions(cue, actions, vacuum)


class PhysicsChapter06Cinematic(CinematicPhysicsBase):
    chapter_number = 6
    accent = MAGENTA

    def render_chapter(self):
        self.magnet_prediction()
        self.magnet_material_demo()
        self.magnet_repeat()
        self.magnet_poles()
        self.magnet_attraction()
        self.magnet_repulsion()
        self.magnet_distance_plan()
        self.magnet_distance_data()
        self.magnet_transfer()
        self.magnet_misconception()
        self.magnet_correction()
        self.magnet_exit()

    def magnet_prediction(self):
        cue, scene = self.start_cue(0, "chapter-06-magnets-hero.png", 0.03)
        labels = VGroup(self.chip("steel", LEFT * 4.0 + DOWN * 1.85, GREY, width=1.4, size=15), self.chip("aluminium", LEFT * 1.25 + DOWN * 1.85, CYAN, width=1.8, size=15), self.chip("copper", RIGHT * 1.4 + DOWN * 1.85, ORANGE, width=1.5, size=15), self.chip("plastic", RIGHT * 4.0 + DOWN * 1.85, BLUE, width=1.5, size=15))
        line = DashedLine(LEFT * 4.8 + DOWN * 0.65, RIGHT * 4.8 + DOWN * 0.65, color=GOLD, stroke_width=5)
        gap = self.chip("no contact", UP * 1.85, MAGENTA, width=2.2)
        question = self.chip("Which objects move?", DOWN * 2.65, GOLD, width=3.9, size=22)
        actions = [lambda i=i: self.add_reveal(labels[i]) for i in range(4)] + [lambda: self.add_reveal(line, gap), lambda: self.add_reveal(question)]
        self.run_actions(cue, actions, question)

    def magnet_material_demo(self):
        cue, scene = self.start_cue(1, "chapter-06-magnets-empty.png", 0.06)
        magnet = self.bar_magnet(LEFT * 3.9 + UP * 0.60, 0.55)
        steel = self.material_sample("steel", LEFT * 3.3 + DOWN * 1.05)
        aluminium = self.material_sample("aluminium", LEFT * 0.8 + DOWN * 1.05)
        copper = self.material_sample("copper", RIGHT * 1.7 + DOWN * 1.05)
        plastic = self.material_sample("plastic", RIGHT * 4.1 + DOWN * 1.05)
        gap = DashedLine(LEFT * 4.2 + DOWN * 0.15, LEFT * 3.35 + DOWN * 0.15, color=MAGENTA, stroke_width=5)
        verdicts = VGroup(self.evidence("steel moves", LEFT * 2.9 + DOWN * 2.25, MAGENTA, width=2.5), self.chip("others: no visible movement", RIGHT * 1.8 + DOWN * 2.25, CYAN, width=4.1, size=16))
        scene.add(magnet, steel, aluminium, copper, plastic)
        self.add(magnet, steel, aluminium, copper, plastic)
        actions = [lambda: self.add_reveal(gap), lambda: steel.animate.shift(LEFT * 0.82 + UP * 0.60), lambda: self.add_reveal(verdicts[0]), lambda: self.focus_on(VGroup(aluminium, copper, plastic), CYAN), lambda: self.add_reveal(verdicts[1])]
        self.run_actions(cue, actions, verdicts)

    def magnet_repeat(self):
        cue, scene = self.start_cue(2, "chapter-06-magnets-empty.png", 0.25)
        rows = VGroup()
        for i, name in enumerate(("steel", "aluminium", "copper", "wood")):
            tag = self.chip(name, ORIGIN, GREY if name == "steel" else CYAN, width=1.8, size=14)
            dots = VGroup(*[Circle(radius=0.14, stroke_color=WHITE, stroke_width=2, fill_color=GREEN if name == "steel" else INK, fill_opacity=1) for _ in range(3)]).arrange(RIGHT, buff=0.25)
            result = self.chip("moves" if name == "steel" else "no visible move", ORIGIN, MAGENTA if name == "steel" else GREY, width=2.4, size=13)
            rows.add(VGroup(tag, dots, result).arrange(RIGHT, buff=0.40))
        rows.arrange(DOWN, buff=0.30).move_to(DOWN * 0.1)
        gap = self.chip("same 2 cm gap", UP * 1.95, GOLD, width=2.6)
        careful = self.chip("claim only what was tested", DOWN * 2.55, VIOLET, width=4.3)
        actions = [lambda: self.add_reveal(gap)] + [lambda i=i: self.add_reveal(rows[i]) for i in range(4)] + [lambda: self.add_reveal(careful)]
        self.run_actions(cue, actions, careful)

    def magnet_poles(self):
        cue, scene = self.start_cue(3, "chapter-06-magnets-empty.png", 0.30)
        left = self.bar_magnet(LEFT * 2.9, 0.82)
        right = self.bar_magnet(RIGHT * 2.9, 0.82, flip=True)
        gap = DashedLine(LEFT * 1.2, RIGHT * 1.2, color=MAGENTA, stroke_width=6)
        n = self.chip("north", LEFT * 1.55 + UP * 1.05, RED, width=1.5, size=15)
        s = self.chip("south", RIGHT * 1.55 + UP * 1.05, BLUE, width=1.5, size=15)
        noncontact = self.evidence("force across a gap", DOWN * 2.05, MAGENTA, width=3.1)
        stable = self.chip("pole colours stay fixed", DOWN * 2.75, GOLD, width=3.6, size=16)
        scene.add(left, right)
        self.add(left, right)
        actions = [lambda: self.add_reveal(n), lambda: self.add_reveal(s), lambda: self.add_reveal(gap), lambda: self.focus_on(VGroup(left, right), MAGENTA), lambda: self.add_reveal(noncontact, stable)]
        self.run_actions(cue, actions, gap)

    def magnet_attraction(self):
        cue, scene = self.start_cue(4, "chapter-06-magnets-empty.png", 0.28)
        cart_l = self.cart(LEFT * 3.7 + DOWN * 0.45, RED, 0.70)
        cart_r = self.cart(RIGHT * 3.7 + DOWN * 0.45, BLUE, 0.70)
        pole_l = self.chip("N", LEFT * 2.75 + UP * 0.25, RED, width=0.65)
        pole_r = self.chip("S", RIGHT * 2.75 + UP * 0.25, BLUE, width=0.65)
        gap = DashedLine(LEFT * 2.35 + DOWN * 0.45, RIGHT * 2.35 + DOWN * 0.45, color=MAGENTA, stroke_width=5)
        arrows = VGroup(self.force_arrow(LEFT * 3.2 + UP * 0.85, LEFT * 1.4 + UP * 0.85, "right magnet on left", MAGENTA, label_shift=UP * 0.35), self.force_arrow(RIGHT * 3.2 + UP * 1.65, RIGHT * 1.4 + UP * 1.65, "left magnet on right", MAGENTA, label_shift=UP * 0.35).rotate(PI, about_point=RIGHT * 2.3 + UP * 1.65))
        verdict = self.evidence("opposite poles attract", DOWN * 2.25, MAGENTA, width=3.5)
        scene.add(cart_l, cart_r, pole_l, pole_r, gap)
        self.add(cart_l, cart_r, pole_l, pole_r, gap)
        actions = [lambda: self.focus_on(gap, MAGENTA), lambda: self.add_reveal(arrows[0]), lambda: self.add_reveal(arrows[1]), lambda: AnimationGroup(cart_l.animate.shift(RIGHT * 2.55), cart_r.animate.shift(LEFT * 2.55), pole_l.animate.shift(RIGHT * 2.55), pole_r.animate.shift(LEFT * 2.55), run_time=0.95), lambda: self.add_reveal(verdict), lambda: self.focus_on(verdict, MAGENTA), lambda: self.focus_on(VGroup(cart_l, cart_r), MAGENTA), lambda: self.focus_on(verdict, MAGENTA)]
        self.run_actions(cue, actions, verdict)

    def magnet_repulsion(self):
        cue, scene = self.start_cue(5, "chapter-06-magnets-empty.png", 0.28)
        cart_l = self.cart(LEFT * 1.6 + DOWN * 0.45, RED, 0.70)
        cart_r = self.cart(RIGHT * 1.6 + DOWN * 0.45, RED, 0.70)
        labels = VGroup(self.chip("N", LEFT * 0.68 + UP * 0.25, RED, width=0.65), self.chip("N", RIGHT * 0.68 + UP * 0.25, RED, width=0.65))
        gap = DashedLine(LEFT * 0.30 + DOWN * 0.45, RIGHT * 0.30 + DOWN * 0.45, color=MAGENTA, stroke_width=5)
        arrows = VGroup(self.force_arrow(LEFT * 1.0 + UP * 1.2, LEFT * 3.0 + UP * 1.2, "right magnet on left", MAGENTA), self.force_arrow(RIGHT * 1.0 + UP * 1.9, RIGHT * 3.0 + UP * 1.9, "left magnet on right", MAGENTA))
        verdict = self.evidence("matching poles repel", DOWN * 2.25, MAGENTA, width=3.3)
        scene.add(cart_l, cart_r, labels, gap)
        self.add(cart_l, cart_r, labels, gap)
        actions = [lambda: self.focus_on(labels, RED), lambda: self.add_reveal(arrows[0]), lambda: self.add_reveal(arrows[1]), lambda: AnimationGroup(cart_l.animate.shift(LEFT * 2.1), cart_r.animate.shift(RIGHT * 2.1), labels[0].animate.shift(LEFT * 2.1), labels[1].animate.shift(RIGHT * 2.1), run_time=0.95), lambda: self.add_reveal(verdict), lambda: self.focus_on(gap, MAGENTA), lambda: self.focus_on(VGroup(cart_l, cart_r), MAGENTA), lambda: self.focus_on(verdict, MAGENTA)]
        self.run_actions(cue, actions, verdict)

    def magnet_distance_plan(self):
        cue, scene = self.start_cue(6, "chapter-06-magnets-empty.png", 0.30)
        track_line = NumberLine(x_range=[0, 9, 1], length=9.6, include_numbers=False, color=WHITE).move_to(DOWN * 0.35)
        track_labels = VGroup(*[
            Text(str(value), font_size=18, color=WHITE).next_to(track_line.n2p(value), DOWN, buff=0.12)
            for value in range(10)
        ])
        track = VGroup(track_line, track_labels)
        magnet = self.bar_magnet(LEFT * 4.2 + UP * 0.55, 0.45)
        gaps = VGroup(self.chip("1 cm", LEFT * 2.7 + UP * 1.3, MAGENTA, width=1.3, size=15), self.chip("4 cm", ORIGIN + UP * 1.3, MAGENTA, width=1.3, size=15), self.chip("8 cm", RIGHT * 2.7 + UP * 1.3, MAGENTA, width=1.3, size=15))
        locks = VGroup(self.chip("same magnets", LEFT * 3.1 + DOWN * 1.65, BLUE, width=2.3, size=14), self.chip("same poles", LEFT * 1.05 + DOWN * 1.65, BLUE, width=2.0, size=14), self.chip("same track", RIGHT * 1.0 + DOWN * 1.65, BLUE, width=2.0, size=14), self.chip("same 2 seconds", RIGHT * 3.2 + DOWN * 1.65, GOLD, width=2.4, size=14))
        repeat = self.evidence("repeat each gap x3", DOWN * 2.60, GREEN, width=3.0)
        scene.add(track, magnet)
        self.add(track, magnet)
        actions = [lambda: self.add_reveal(gaps[0]), lambda: self.add_reveal(gaps[1]), lambda: self.add_reveal(gaps[2]), lambda: self.add_reveal(locks), lambda: self.focus_on(track, GOLD), lambda: self.add_reveal(repeat)]
        self.run_actions(cue, actions, repeat)

    def magnet_distance_data(self):
        cue, scene = self.start_cue(7, "chapter-06-magnets-empty.png", 0.42)
        base = Line(LEFT * 4.6 + DOWN * 2.0, RIGHT * 4.6 + DOWN * 2.0, color=WHITE, stroke_width=4)
        bars = VGroup(Rectangle(width=1.6, height=3.5, stroke_width=0, fill_color=MAGENTA, fill_opacity=0.95).move_to(LEFT * 2.7 + DOWN * 0.25), Rectangle(width=1.6, height=1.5, stroke_width=0, fill_color=VIOLET, fill_opacity=0.95).move_to(ORIGIN + DOWN * 1.25), Rectangle(width=1.6, height=0.24, stroke_width=0, fill_color=GREY, fill_opacity=0.95).move_to(RIGHT * 2.7 + DOWN * 1.88))
        values = VGroup(self.chip("1 cm -> 14 cm", LEFT * 2.7 + UP * 2.05, MAGENTA, width=2.4, size=15), self.chip("4 cm -> 6 cm", UP * 0.95, VIOLET, width=2.4, size=15), self.chip("8 cm -> <1 cm", RIGHT * 2.7 + DOWN * 1.25, GREY, width=2.5, size=15))
        conclusion = self.evidence("greater gap, smaller observed effect", DOWN * 2.65, GREEN, width=5.0)
        scene.add(base)
        self.add(base)
        actions = [lambda: self.add_reveal(bars[0], values[0]), lambda: self.add_reveal(bars[1], values[1]), lambda: self.add_reveal(bars[2], values[2]), lambda: self.focus_on(bars, MAGENTA), lambda: self.add_reveal(conclusion)]
        self.run_actions(cue, actions, conclusion)

    def magnet_transfer(self):
        cue, scene = self.start_cue(8, "chapter-06-magnets-empty.png", 0.34)
        door = RoundedRectangle(width=4.2, height=4.5, corner_radius=0.18, stroke_color=WHITE, stroke_width=4, fill_color=CREAM, fill_opacity=0.85).move_to(LEFT * 2.1 + DOWN * 0.10)
        frame = RoundedRectangle(width=2.4, height=4.5, corner_radius=0.18, stroke_color=BLUE, stroke_width=6, fill_color=INK, fill_opacity=0.58).move_to(RIGHT * 2.5 + DOWN * 0.10)
        magnet = self.bar_magnet(RIGHT * 1.6 + UP * 0.1, 0.42)
        plate = Rectangle(width=0.25, height=1.10, stroke_color=WHITE, stroke_width=2, fill_color=GREY, fill_opacity=1).move_to(LEFT * 0.02 + UP * 0.10)
        gap = DashedLine(LEFT * 0.95 + UP * 0.1, RIGHT * 0.85 + UP * 0.1, color=MAGENTA, stroke_width=5)
        wide = self.chip("wide gap: weak effect", UP * 2.45, ORANGE, width=3.4, size=16)
        narrow = self.chip("narrow gap: reliable pull", DOWN * 2.40, GREEN, width=3.8, size=16)
        scene.add(door, frame, magnet, plate)
        self.add(door, frame, magnet, plate)
        actions = [lambda: self.add_reveal(gap), lambda: self.add_reveal(wide), lambda: door.animate.shift(RIGHT * 1.25), lambda: gap.animate.scale(0.35), lambda: self.add_reveal(narrow), lambda: self.focus_on(VGroup(magnet, plate), MAGENTA)]
        self.run_actions(cue, actions, narrow)

    def magnet_misconception(self):
        cue, scene = self.start_cue(9, "chapter-06-magnets-empty.png", 0.22)
        claim = self.chip("magnets attract every metal", UP * 2.1, RED, width=5.1, size=22)
        samples = VGroup(self.material_sample("steel", LEFT * 2.9 + UP * 0.3), self.material_sample("aluminium", ORIGIN + UP * 0.3), self.material_sample("copper", RIGHT * 2.9 + UP * 0.3))
        labels = VGroup(self.chip("steel moves", LEFT * 2.9 + DOWN * 0.55, MAGENTA, width=2.0, size=14), self.chip("aluminium: no move", DOWN * 0.55, CYAN, width=2.7, size=14), self.chip("copper: no move", RIGHT * 2.9 + DOWN * 0.55, ORANGE, width=2.4, size=14))
        cross = VGroup(Line(claim.get_corner(UL), claim.get_corner(DR), color=RED, stroke_width=8), Line(claim.get_corner(UR), claim.get_corner(DL), color=RED, stroke_width=8)).set_z_index(115)
        verdict = self.evidence("one counterexample rejects 'every'", DOWN * 2.20, GREEN, width=4.6)
        actions = [lambda: self.add_reveal(claim), lambda: self.add_reveal(samples[0], labels[0]), lambda: self.add_reveal(samples[1], labels[1]), lambda: self.add_reveal(samples[2], labels[2]), lambda: self.add_reveal(cross, verdict)]
        self.run_actions(cue, actions, verdict)

    def magnet_correction(self):
        cue, scene = self.start_cue(10, "chapter-06-magnets-empty.png", 0.34)
        rules = VGroup(self.card("materials", LEFT * 3.35, width=3.0, height=3.0, color=CYAN), self.card("poles", ORIGIN, width=3.0, height=3.0, color=MAGENTA), self.card("distance", RIGHT * 3.35, width=3.0, height=3.0, color=VIOLET))
        details = VGroup(self.chip("some, incl. steel", LEFT * 3.35 + DOWN * 0.20, CYAN, width=2.4, size=14), self.chip("attract or repel", DOWN * 0.20, MAGENTA, width=2.4, size=14), self.chip("effect changes", RIGHT * 3.35 + DOWN * 0.20, VIOLET, width=2.4, size=14))
        evidence = self.chip("claim only what the evidence supports", DOWN * 2.35, GOLD, width=5.8, size=18)
        actions = [lambda: self.add_reveal(rules[0]), lambda: self.add_reveal(details[0]), lambda: self.add_reveal(rules[1], details[1]), lambda: self.add_reveal(rules[2], details[2]), lambda: self.add_reveal(evidence), lambda: self.focus_on(rules, GOLD)]
        self.run_actions(cue, actions, evidence)

    def magnet_exit(self):
        cue, scene = self.start_cue(11, "chapter-06-magnets-empty.png", 0.25)
        cards = VGroup(self.card("N faces S", LEFT * 3.35 + UP * 0.15, width=3.0, height=3.2, color=MAGENTA), self.card("N faces N", ORIGIN + UP * 0.15, width=3.0, height=3.2, color=RED), self.card("N faces aluminium", RIGHT * 3.35 + UP * 0.15, width=3.0, height=3.2, color=CYAN))
        results = VGroup(self.chip("move together?", LEFT * 3.35 + DOWN * 0.55, MAGENTA, width=2.4, size=14), self.chip("move apart?", DOWN * 0.55, RED, width=2.2, size=14), self.chip("no visible move?", RIGHT * 3.35 + DOWN * 0.55, CYAN, width=2.6, size=14))
        prompt = self.chip("Predict, then name the evidence", DOWN * 2.45, GOLD, width=5.2, size=20)
        actions = [lambda: self.add_reveal(cards[0]), lambda: self.add_reveal(results[0]), lambda: self.add_reveal(cards[1], results[1]), lambda: self.add_reveal(cards[2], results[2]), lambda: self.add_reveal(prompt), lambda: self.focus_on(cards, GOLD)]
        self.run_actions(cue, actions, prompt)
