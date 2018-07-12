import { arc } from "d3-shape";
import { select } from "d3-selection";
import { transition } from "d3-transition";
import { interpolate } from "d3-interpolate";
import { easeBounce } from "d3-ease";

export default {
	arc: arc,
	select: select,
	easeBounce: easeBounce,
	transition: transition,
	interpolate: interpolate,
};
