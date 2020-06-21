export class GlobalConstants {
   
    public static testURL: string = "http://localhost:9090/DLRS/";
    public static restURL: string = "http://localhost:8080/DLRS/";
        
    
    public static DATEFORMAT:string = "yyyy-MM-dd HH:mm:ss";
	public static NOTPAID:string = "Not Paid";
	public static PAIDANDAWAITINGREPORT:string = "Payment Done and Awaiting Report";
	public static REPORTGENERATED:string = "Report Generated";
	public static PAYMENTSUCCESS:string = "Success";
	public static PAYMENTFAILURE:string = "Failed";

	public static LOGIN_BY_ADMIN:string = "ROLE_ADMIN";
	public static LOGIN_BY_NORMAL_USER:string = "ROLE_USER";

	/* Routes */

	public static HOME_COMPONENT="home";
	public static USERDASHBOARD_COMPONENT="userDashboard";
	public static ADMINDASHBOARD_COMPONENT="adminDashboard";
	public static CHECKOUT_COMPONENT="chekcout";
	public static LOGIN_COMPONENT="login";
	// viewing all the appointments by admin
	public static VIEW_USER_APPOINTMENT_COMPONENT="viewUserAppointments";
	public static REGISTER_COMPONENT="registerComponent";
	public static ABOUT_COMPONENT="about";
	public static CREATE_TEST_COMPONENT="createTest";
	public static VIEW_TEST_COMPONENT="viewTest";
	// view individual user appointments
	public static VIEW_APPOINTMENT="viewAppointment";
	public static CREATE_APPOINTMENT="appointment";



   
}