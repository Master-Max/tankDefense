class User {
  constructor(data) {
    // debugger
    this.id = data.id;
    this.name = data.name;
    this.highscore = data.highscore;
    User.all.push(this);
  }

  renderUserHighScores() {
    return `
    <ul>
     <h3>${this.name}
       <span>${this.highscore}</span>
     </h3>
   </ul>`;
  }

  static renderAllUserDropbox() {
    // debugger
    let options = User.all.map(function(user){
      return `<option value='p1'>${user.name}</option>`
    })
    debugger
    return `
      <option value="">Select your option</option>
      ${options.join('')}`;
  }

    renderUpdateForm() {
      return `
      <form data-id=${this.id}>
        <label>Username</label>
        <p>
          <input type="text" value="${this.name}" />
        </p>
        <label>Content</label>
        <p>
          <textarea>${this.highscore}</textarea>
        </p>
        <button type='submit'>Save Game</button>
      </form>`;
    }

    static findById(id) {
      return this.all.find(user => user.id === id);
    }
  } //end of User

User.all = [];
