class SessionStorage {
  _token;

  get token() {
    return this._token;
  }

  set token(value) {
    this._token = value;
  }
}

export const sessionStorage = new SessionStorage();
