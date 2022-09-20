import joi from "joi";
import JoiDate from "@joi/date";

const Joi = joi.extend(JoiDate);

export const pollSchema = Joi.object({

    title: Joi.string().required(),
    expireAt: Joi.date().format('YYYY-MM-DD HH:mm')

});