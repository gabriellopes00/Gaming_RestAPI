//yup validator
import * as Yup from 'yup';

const year = new Date().getFullYear();

class Validation{
  constructor(){
    this.userValidation = Yup.object().shape({
      name: Yup.string().required().min(1),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(4)
    })

    this.gamesValidation = Yup.object().shape({
      title: Yup.string().required().trim(),
      year: Yup.number().required().positive().integer().max(year),
      price: Yup.number().required().min(0),
      company: Yup.string().required(),
      imageLink: Yup.string().required().url(),
      officialWebsiteLink: Yup.string().url(),
      description: Yup.string().required().max(700),
    })
  }
}
const Validator = new Validation();

export default Validator;