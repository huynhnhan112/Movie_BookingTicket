import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import { DANG_NHAP_ACTION } from "./types/QuanLyNguoiDungType";
import { history } from "../../App";
import {SET_THONG_TIN_NGUOI_DUNG} from '../../redux/actions/types/QuanLyNguoiDungType';
import { hideLoadingAction, showLoadingAction } from "./LoadingActions";


export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try{
            await dispatch(showLoadingAction);
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
           
            if(result.data.statusCode === 200){
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
                //Chuyển hướng đăng nhập về trang trước đó
                history.goBack();
            }

            console.log('result', result);
            dispatch(hideLoadingAction);

        }catch(error) {
            dispatch(hideLoadingAction);
            console.log('error', error.response);
        }
    }
}

export const layThongTinNguoiDungAction = () => {
    return async (dispatch) => {
        try{
            await dispatch(showLoadingAction);
            const result = await quanLyNguoiDungService.layThongTinNguoiDung();
            
            if(result.data.statusCode === 200){
                dispatch({
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                })
            }
            console.log(result);

            dispatch(hideLoadingAction);
        }
        catch(error){
            dispatch(hideLoadingAction);
            console.log('error', error.response.data);
        }
    }
}
















