import LoginForm from "../../formik/login";

export function Login() {
    return(
        <div className="container">
            <div className="row justify-content-md-center">
                <div className="col-md-6">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
}