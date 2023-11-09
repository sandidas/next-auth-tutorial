export { };

declare global {



    // =================== 
    //  USER INTERFACE GLOBAL
    // =================== 
    interface IUser {
        _id?: string;
        name: string;
        email: string;
        password?: string;
        uid?: string;
        roles?: string;
        is_admin?: boolean;
        active: boolean;
        roles?: number[];
        softDelete?: boolean;
        lastLoginAt?: string;
        refreshToken?: string;
        sAccessToken?: string;
        issuedAt?: number;
        occupation?: string;
        deletedAt?: string;
        provider?: string;
        image?: string;
        bio?: string;
        lastLoginAt?: string;
        city?: string;
        state?: string;
        country?: string;
        phoneNumber?: string;
        forgotPasswordToken?: string;
        forgotPasswordTokenExpiry?: string;
        verifyToken?: string;
        verifyTokenExpiry?: string;
    };

}