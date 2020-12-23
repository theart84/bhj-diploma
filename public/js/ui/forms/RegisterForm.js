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
  async onSubmit(options) {
    const response = await User.register(options, User.setCurrent);
    this.element.reset();
    App.modals.register.close()
    response.success
        ? App.setState('user-logged')
        : App.setState('init');
  }
}
