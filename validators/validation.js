//yup validator
import * as Yup from 'yup';

class Validation{
  constructor(){
    this.userValidation = Yup.object().shape({
      name: Yup.string().required().min(1),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(4)
    })

    this.gamesValidation = Yup.object().shape({
      title: Yup.string().required(),
      year: Yup.number().required().positive().integer(),
      price: Yup.number().required().positive(),
      company: Yup.string().required()
    })
  }
}

const Validator = new Validation();

export default Validator;