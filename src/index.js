import "./style.css";

import cpp from "./images/C++.png";
import javaScript from "./images/javaScript.png";
import python from "./images/python.png";
import ruby from "./images/ruby.png";

const carousel_controller = (() => {
  let image_array = [];

  let image_index = 0;
  const image_pieces = 4;

  const image_cpp = new Image();
  image_cpp.src = cpp;
  image_cpp.classList.add("current_image");

  const image_javaScript = new Image();
  image_javaScript.src = javaScript;
  image_javaScript.classList.add("current_image");

  const image_python = new Image();
  image_python.src = python;
  image_python.classList.add("current_image");

  const image_ruby = new Image();
  image_ruby.src = ruby;
  image_ruby.classList.add("current_image");

  image_array.push(image_cpp);
  image_array.push(image_javaScript);
  image_array.push(image_python);
  image_array.push(image_ruby);

  // move to next tab
  function move_to_next_tab() {
    image_index =
      (((image_index + 1) % image_pieces) + image_pieces) % image_pieces;
    display();
    console.log(new Date());
  }

  // change_tab
  // When the users click on another tab, the slider shouldn't change anymore

  function change_tab(e) {
    clearInterval(interval_controller);
    image_index = e.target.index_number;
    display();
  }

  const tab_listener = () => {
    const tab_buttons = document.querySelectorAll(".single_mini_tab");
    tab_buttons.forEach((item) => item.addEventListener("click", change_tab));
  };

  // left_right_triangle_click_listener

  function image_index_plus() {
    clearInterval(interval_controller);
    image_index =
      (((image_index + 1) % image_pieces) + image_pieces) % image_pieces;
    display();
  }

  function image_index_minus() {
    clearInterval(interval_controller);
    image_index =
      (((image_index - 1) % image_pieces) + image_pieces) % image_pieces;
    display();
  }

  const left_right_triangle_click_listener = () => {
    const left_triangle_listener = document.querySelector(".triangle_left");
    left_triangle_listener.addEventListener("click", image_index_minus);

    const right_triangle_listener = document.querySelector(".triangle_right");
    right_triangle_listener.addEventListener("click", image_index_plus);
  };

  const display = () => {
    const img_section = document.querySelector(".img_section");
    img_section.innerHTML = "";
    img_section.appendChild(image_array[image_index]);

    const mini_tab_section = document.createElement("div");
    mini_tab_section.classList.add("mini_tab_section");

    for (let i = 0; i < image_pieces; i++) {
      const mini_tab = document.createElement("div");
      mini_tab.textContent = i + 1;
      mini_tab.index_number = i;
      mini_tab.classList.add("single_mini_tab");
      mini_tab_section.appendChild(mini_tab);
    }

    img_section.appendChild(mini_tab_section);

    const current_index = document.querySelector(
      `div[class="single_mini_tab"]:nth-child(${image_index + 1})`
    );
    current_index.classList.add("current_index");

    left_right_triangle_click_listener();
    tab_listener();
  };

  // interval_controller is not a function. But it starts automatically after definition.
  // No need to call it again after definition
  const interval_controller = setInterval(move_to_next_tab, 3000);

  const initialize = () => {
    display();
  };

  return { initialize };
})();

carousel_controller.initialize();
