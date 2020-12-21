/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  async onSubmit(options, type) {
    await User.register(options, User.setCurrent);
    const currentForm = App.getForm(type);
    const currentModal = App.getModal(type);
    currentForm.element.reset();
    App.setState('user-logged');
    currentModal.close();
  }
}
