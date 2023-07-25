import { createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/Status";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import axiosInstance from "../../utils/AxiosInstance";
const QuestionListAPI = '/interviewer/question?page=1&size=2'

const QuestionListSLice = createSlice({
    name: 'questionList',
    initialState: {
        questionList: [],
        questionListStatus: STATUS.IDLE
    },
    reducers: {
        setQuestionList(state, action){
            state.questionList = action.payload
        },
        setQuestionStatus(state, action){
            state.questionListStatus = action.payload
        }
    }
})

export default QuestionListSLice.reducer
export const {setQuestionList, setQuestionStatus} = QuestionListSLice.actions

export const fetchQuestionList = () => {
    return async function fetchQuestionThunk(dispatch : Dispatch){ 
        dispatch(setQuestionStatus(STATUS.LOADING));
        try{
            const reponse = await axiosInstance.get(`${QuestionListAPI}`);
            const data = await reponse.data();
            dispatch(setQuestionList(data));
            dispatch(setQuestionStatus(STATUS.IDLE));
        }catch(error){
            dispatch(setQuestionStatus(STATUS.ERROR));
        }
    };
}