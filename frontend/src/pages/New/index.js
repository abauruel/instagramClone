import React, { Component } from "react";

import "./styles.css";
import api from "../../services/api";

export default class New extends Component {
  state = {
    image: null,
    author: "",
    place: "",
    description: "",
    hastag: ""
  };
  handleChange = e => {
    this.setState({ [e.target.name]: [e.target.value] });
  };

  handleImageChange = async e => {
    await this.setState({
      image: e.target.files[0]
    });
  };

  handleSubmit = async e => {
    e.preventDefault();

    const data = new FormData();
    data.append("image", this.state.image);
    data.append("author", this.state.author);
    data.append("place", this.state.place);
    data.append("description", this.state.description);
    data.append("hastag", this.state.hastag);

    console.log(data.getAll);
    await api.post("posts", data);

    this.props.history.push("/");
  };
  render() {
    return (
      <form className="new-post">
        <input type="file" onChange={this.handleImageChange} />

        <input
          type="text"
          name="author"
          placeholder="Autor do post"
          onChange={this.handleChange}
          value={this.state.author}
        />

        <input
          type="text"
          name="place"
          placeholder="Local do post"
          onChange={this.handleChange}
          value={this.state.place}
        />

        <input
          type="text"
          name="description"
          placeholder="descrição do post"
          onChange={this.handleChange}
          value={this.state.description}
        />

        <input
          type="text"
          name="hastag"
          placeholder="hastag do post"
          onChange={this.handleChange}
          value={this.state.hastag}
        />

        <button type="submit" onClick={this.handleSubmit}>
          Enviar
        </button>
      </form>
    );
  }
}
