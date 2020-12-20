/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  async onSubmit( options, type ) {
    let response = await User.login(options, User.setCurrent);
    if (!response.success) {
      return;
    }
    const currentForm = App.getForm(type);
    const currentModal = App.getModal(type);
    currentForm.currentElement.reset();
    App.setState('user-logged');
    currentModal.close();
  }
}
