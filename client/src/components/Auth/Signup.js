import React from 'react';
import { Mutation } from 'react-apollo'
import { withRouter } from 'react-router-dom'
import { ADD_USER } from '../../queries/mutations';
import Error from '../Error'


const initialState = {
    username: "",
    email: "",
    password: "",
    passwordConfirmation: ""
}

class Signup extends React.Component {
    state = { ...initialState }

    clearState = () => {
        this.setState({ ...initialState })

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = (event, addUser) => {
        event.preventDefault();
        addUser().then(async ({ data }) => {
            console.log(data)
            //let strData = JSON.stringify(data)
            //let strToken = strData.substring('{"data":{"login":{"token":"'.length, strData.indexOf('","user":'))
            localStorage.setItem('token', data.addUser.token)
            //  await this.props.refetch();
            this.clearState();
            this.props.history.push('/')
        })
    }

    validateForm = () => {
        const { username, email, password, passwordConfirmation } = this.state
        const isInvalid = !username || !email || !password || !passwordConfirmation || (password !== passwordConfirmation);
        return isInvalid
    }

    render() {

        const { username, email, password, passwordConfirmation } = this.state
        return (
            <div className="App">
                <h2>Sign-Up</h2>

                <Mutation mutation={ADD_USER} variables={{ username, email, password }}>
                    {(addUser, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, addUser)}>
                                <label for="username">User Name: </label>
                                <input type="text" name="username" id="username" placeholder="Username" onChange={this.handleChange} value={username} />
                                <label for="email">Email Address: </label>
                                <input type="email" name="email" id="email" placeholder="Email Address" onChange={this.handleChange} value={email} />
                                <label for="password">Password: </label>
                                <input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} value={password} />
                                <label for="passwordConfimration">Confirm: </label>
                                <input type="password" name="passwordConfirmation" id="confirmpassword" placeholder="Confirm Password" onChange={this.handleChange} value={passwordConfirmation} />
                                <button type="submit" disabled={loading || this.validateForm()} className="button-primary">Submit</button>
                                {error && <Error error={error} />}
                            </form>
                        );
                    }}
                </Mutation>



            </div>
        )
    }

}

export default withRouter(Signup);