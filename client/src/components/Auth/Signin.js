import React from 'react';
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import { LOGIN_USER } from '../../queries/mutations';
import Error from '../Error'


const initialState = {
    username: "",
    password: ""

}

class Signin extends React.Component {
    state = { ...initialState }

    clearState = () => {
        this.setState({ ...initialState })

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }

    handleSubmit = (event, login) => {
        event.preventDefault();
        login().then(async ({ data }) => {
            console.log({ data })
            //let strData = JSON.stringify(data)
            //let strToken = strData.substring('{"data":{"login":{"token":"'.length, strData.indexOf('","user":'))
            localStorage.setItem('token', data.login.token)
            //  await this.props.refetch();
            //var myData = localStorage.getItem('token');
            //console.log(myData)
            //console.log(JSON.parse(myData))
            //var testing1 = myData.substring('{"data":{"login":{"token":"'.length, myData.indexOf('","user":'))
            //console.log(testing1)//myData.data.login.token)
            this.clearState();
            this.props.history.push('/')

        })
    }

    validateForm = () => {
        const { username, password, } = this.state
        const isInvalid = !username || !password;
        return isInvalid
    }

    render() {

        const { username, password } = this.state
        return (
            <div className="App">
                <h2>Sign-In</h2>

                <Mutation mutation={LOGIN_USER} variables={{ username, password }}>
                    {(login, { data, loading, error }) => {
                        return (
                            <form className="form" onSubmit={event => this.handleSubmit(event, login)}>
                                <label for="username">User Name: </label>
                                <input type="text" name="username" id="username" placeholder="Username" onChange={this.handleChange} value={username} />
                                <label for="password">Password: </label>
                                <input type="password" name="password" id="password" placeholder="Password" onChange={this.handleChange} value={password} />
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

export default withRouter(Signin);