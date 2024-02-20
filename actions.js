import Appointment from "@/models/appointment";

const getAppointmentData = async () => {
  try {
    const appointments = await Appointment?.find({});
    return appointments;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const actions = { getAppointmentData };
export default actions;
