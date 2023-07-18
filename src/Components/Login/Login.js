import React, { useState } from "react";
import { useUserAuth } from "@/Context/UserAuthContext";
import { toast } from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import DefaultBTN from "../Utility/DefaultBTN";
import "react-phone-input-2/lib/style.css";
const Login = () => {
  const [userOTP, setuserOTP] = useState("");
  const [loading, setloading] = useState(false);
  const [phoneNo, setphoneNo] = useState("");
  const { sendSMS, otpSend, createNewUser, timer, isTimerRunning, resendOTP } =
    useUserAuth();

  const sendOTPtoUser = async () => {
    setloading(true);
    if (phoneNo.length < 9) {
      toast.error("Enter the number");
      return setloading(false);
    }
    await sendSMS(phoneNo);
    return setloading(false);
  };

  const verifyOTP = async () => {
    setloading(true);
    if (!userOTP) {
      toast.error("Enter the OTP");
      return setloading(false);
    }
    await createNewUser(parseInt(userOTP), phoneNo);
    return setloading(false);
  };
  return (
    <form className="flex flex-col gap-5" >
      <div>
        <PhoneInput
          country={"in"}
          onlyCountries={["in"]}
          value={phoneNo ? phoneNo : ""}
          onChange={(phone) => setphoneNo(phone)}
        />
      </div>

      {otpSend && (
        <>
          <div className="w-full border rounded-md">
            <input
              type="number"
              onChange={(e) => {
                setuserOTP(e.target.value);
              }}
              className="p-2 w-full outline-none py-3 "
              placeholder="Enter OTP"
            />
          </div>
          <div className="w-full">
            <button
              onClick={async () => {
                await resendOTP(phoneNo);
              }}
              disabled={isTimerRunning ? true : false}
              className="pColor font-semibold float-right"
            >
              Reset OTP in : {timer}s
            </button>
          </div>
          <DefaultBTN
            btnStyle=" px-5 py-3  w-full rounded-md pBtn"
            nameBtn="Verify OTP"
            func={verifyOTP}
            loading={loading}
          />
        </>
      )}

      {!otpSend && (
        <DefaultBTN
          btnStyle=" px-5 py-3  w-full rounded-md pBtn"
          nameBtn="Send OTP"
          func={sendOTPtoUser}
          loading={loading}
        />
      )}

      <div className="text-gray-500">
        By clicking on Login, I accept the{" "}
        <span className="pColor font-semibold">Terms & Conditions </span> &{" "}
        <span className="pColor font-semibold">Privacy Policy</span>
      </div>
    </form>
  );
};

export default Login;
