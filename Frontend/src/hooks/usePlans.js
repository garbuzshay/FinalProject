// import { useState, useEffect } from "react";
// import PlansApi from "../api/PlansApi";

// const usePlans = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchPlans = async () => {
//     try {
//       const data = await PlansApi.getPlans();
//       const parsedData = data.map((plan) => ({
//         ...plan,
//         exhibitions:
//           plan.maxExhibitions === null
//             ? "Unlimited exhibitions"
//             : `Up to ${plan.maxExhibitions} exhibitions`,
//         artworks:
//           plan.maxArtWorks === null
//             ? "Unlimited artworks"
//             : `Manage up to ${plan.maxArtWorks} artworks`,
//       }));

//       setPlans(parsedData);
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//       setError("Failed to load plans. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const updatePlan = async (id, updatedPlanData) => {
//     try {
//       const updatedPlan = await PlansApi.updatePlan(id, updatedPlanData);
//       setPlans(
//         plans.map((plan) =>
//           plan._id === id ? { ...updatedPlan } : { ...plan }
//         )
//       );
//     } catch (error) {
//       console.error("Error updating plan:", error);
//       setError("Failed to update plan. Please try again later.");
//     }
//   };

//   const addPlan = async (newPlanData) => {
//     try {
//       const newPlan = await PlansApi.createPlan(newPlanData);
//       setPlans([...plans, newPlan]);
//     } catch (error) {
//       console.error("Error adding plan:", error);
//       setError("Failed to add plan. Please try again later.");
//     }
//   };
//   const deletePlan = async (id) => {
//     try {
//       await PlansApi.deletePlan(id);
//       setPlans(plans.filter((plan) => plan._id !== id));
//     } catch (error) {
//       console.error("Error deleting plan:", error);
//       setError("Failed to delete plan. Please try again later.");
//     }
//   };

//   return { plans, loading, error, updatePlan, addPlan, deletePlan, fetchPlans };
// };

// export default usePlans;


import { useState, useEffect } from "react";
import PlansApi from "../api/PlansApi";

const usePlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPlans = async () => {
    try {
      const data = await PlansApi.getPlans();
      const parsedData = data.map((plan) => ({
        ...plan,
        exhibitions:
          plan.maxExhibitions === null
            ? "Unlimited exhibitions"
            : `Up to ${plan.maxExhibitions} exhibitions`,
        artworks:
          plan.maxArtWorks === null
            ? "Unlimited artworks"
            : `Manage up to ${plan.maxArtWorks} artworks`,
      }));
      setPlans(parsedData);
    } catch (error) {
      console.error("Error fetching plans:", error);
      setError("Failed to load plans. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const getPlanNameById = (planId) => {
    const plan = plans.find((p) => p._id === planId);
    return plan ? plan.name : "Unknown Plan";
  };

  const getPlanPriceById = (planId) => {
    const plan = plans.find((p) => p._id === planId);
    return plan ? `$${plan.price}` : "Price not available";
  };

  const updatePlan = async (id, updatedPlanData) => {
    try {
      const updatedPlan = await PlansApi.updatePlan(id, updatedPlanData);
      setPlans(
        plans.map((plan) =>
          plan._id === id ? { ...updatedPlan } : { ...plan }
        )
      );
    } catch (error) {
      console.error("Error updating plan:", error);
      setError("Failed to update plan. Please try again later.");
    }
  };

  const addPlan = async (newPlanData) => {
    try {
      const newPlan = await PlansApi.createPlan(newPlanData);
      setPlans([...plans, newPlan]);
    } catch (error) {
      console.error("Error adding plan:", error);
      setError("Failed to add plan. Please try again later.");
    }
  };

  const deletePlan = async (id) => {
    try {
      await PlansApi.deletePlan(id);
      setPlans(plans.filter((plan) => plan._id !== id));
    } catch (error) {
      console.error("Error deleting plan:", error);
      setError("Failed to delete plan. Please try again later.");
    }
  };

  return {
    plans,
    loading,
    error,
    getPlanNameById,
    getPlanPriceById,
    updatePlan,
    addPlan,
    deletePlan,
    fetchPlans,
  };
};

export default usePlans;
