module.exports = ({ req }) => {
    return `
    <div>
        Your id is: ${req.session.userId}
        <form method="POST">
            <input name="email" placeholder="email" />
            <input name="password" placeholder="password" />
            <input name="passwordConfirmation" placeholder="password confirmation" />
            <button>Submit</button>
        </form>
    </div>
    `;
};