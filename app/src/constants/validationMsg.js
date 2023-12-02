const validation = {
    validateField(val) {
        if (val === 'password') {
            return 'Password must contain at least eight characters, one letter, one number and one special character.'
        }
        return val ? 'Please enter a validate ' + val + '.' : 'Please validate all the fields!'
    },
    requiredField(val) {
        return val ? val + ' is required!' : 'This field is required!'
    },
    generaleError: 'Something went wrong please try again after sometime.'
}

export default validation;