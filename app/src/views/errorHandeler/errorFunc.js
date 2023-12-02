import defaultValue from '../../constants/defaultValue';
import OutsideAuthApi from '../../services/outSideAuth';
import ReduxStore from '../../store';
import { snackbarUpdate } from '../../store/actions';
const { dispatch } = ReduxStore;

const errorFnc = (error, onlyErrorShow) => {
    try {
        if (onlyErrorShow) {
            dispatch(snackbarUpdate({
                type: 'error',
                msg: error?.toString()
            }))
        } else {
            const requestData = {
                type: defaultValue.reportType.code,
                title: 'Code Error',
                description: error?.toString(),
            }
            OutsideAuthApi()
                .createReport(requestData)
                .then((res) => {

                })
                .catch((err) => {

                });
        }
    } catch (e) {
        console.log(e)
    }
}

export default errorFnc;