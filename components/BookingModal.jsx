import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import moment from "moment";

const BookingModal = ({ date, timeSlot, unFormatedDate }) => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const FormatedDate = moment(
    unFormatedDate,
    "ddd MMM DD YYYY HH:mm:ss ZZ"
  ).toISOString();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API}/book-appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: data.name,
            phone: data.phone,
            day: FormatedDate,
            timeSlot,
          }),
        }
      );
      setLoading(false);
      document.getElementById("my_modal_3").close();
      toast.success("Rendez-vous pris avec Success");
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
    // console.log(data);
  };

  return (
    <dialog id="my_modal_3" className="modal">
      <div className="modal-box flex flex-col justify-center items-center">
        <h3 className="font-bold text-xl">Réserver un Rendez-vous</h3>
        <p className="text-center text-gray-700 pb-3">
          {date} || {timeSlot}{" "}
        </p>
        <form method="dialog" onSubmit={handleSubmit(onSubmit)}>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Nom Complet</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              {...register("name", { required: true })}
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <label className="form-control w-full mt-2">
            <div className="label">
              <span className="label-text">Phone</span>
            </div>
            <input
              type="text"
              {...register("phone", { required: true })}
              placeholder="+212-xxx-xxx-xxx"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
          <button
            type="submit"
            className="btn btn-success text-white mt-7 w-full"
          >
            {!loading ? "Confirmez" : "Loading..."}
          </button>
          <button
            type="button"
            onClick={() => {
              document.getElementById("my_modal_3").close();
            }}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default BookingModal;
