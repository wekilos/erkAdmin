import { lazy } from "react";

// export const Users = lazy(() => import("./users/users"));  //old version
export const Users = lazy(()=>import('./users/users/ulanyjylar'));
export const NotFound = lazy(() => import("./404/404"));

export const Doctor = lazy(() => import("./lukman/lukman"));
export const Doctor_Sanaw=lazy(()=>import('./lukman/lukman_sanaw'));
export const Markets = lazy(()=>import('./ugrukdyryjy/yolHaty'));
export const YolHatyBermek = lazy(()=>import('./ugrukdyryjy/yolHatyBer'));
export const UlanyjyGornush = lazy(()=>import('./ulanyjy Gornush/ulanyjyGornush'));
export const Login = lazy(()=>import('./login/login'));

export const Orders = lazy(()=>import('./Orders/lukman'));
export const ArchiveOrders = lazy(()=>import('./Orders/gowshurlanOrders'));
export const YatyrlanOrders = lazy(()=>import('./Orders/yatyrlanlar'));
export const OrderStatus = lazy(()=>import('./Orders/lukman_sanaw'));
export const Status = lazy(()=>import('./SargytEtmek/lukman_sanaw'));
export const Sargyt = lazy(()=>import("./SargytEtmek/sargyt"));
export const Config = lazy(()=>import('./config/lukman_sanaw'));
export const HideProducts = lazy(()=>import('./lukman/hideProducts'));

export const Gozlegdakiler = lazy(()=>import('./Gozleg/lukman'));
export const Tapylanlar = lazy(()=>import('./Gozleg/tapylanlar'));
export const Tapylmadyklar = lazy(()=>import('./Gozleg/tapylmadyklar'));


export const Posts = lazy(()=>import('./posts/lukman_sanaw'));



