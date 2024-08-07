import React, { useState } from "react";
import { useAdminContext } from "../../contexts/AdminContext";
import EditableTable from "../common/EditableTable";

const AdminTermsPricesPackages = () => {
  const [terms, setTerms] = useState(
    "These are the initial terms and conditions..."
  );
  const [isEditingTerms, setIsEditingTerms] = useState(false);
  const [newTerms, setNewTerms] = useState(terms);
  const { plansData } = useAdminContext();
  const { plans, loading, error, updatePlan, addPlan, deletePlan } = plansData;
  const [editingPlanIndex, setEditingPlanIndex] = useState(null);
  const [newPlanData, setNewPlanData] = useState({});
  const [isAdding, setIsAdding] = useState(false);
  const [newPlan, setNewPlan] = useState({
    name: "",
    maxExhibitions: "",
    maxArtWorks: "",
    features: "",
    price: "",
  });

  const handleEditTerms = () => {
    setIsEditingTerms(true);
  };

  const handleSaveTerms = (e) => {
    e.preventDefault();
    setTerms(newTerms);
    setIsEditingTerms(false);
  };

  const handleEditPlan = (index) => {
    setEditingPlanIndex(index);
    setNewPlanData(plans[index]);
  };

  const handleSavePlan = async (e) => {
    e.preventDefault();
    await updatePlan(newPlanData._id, newPlanData);
    setEditingPlanIndex(null);
    setNewPlanData({});
  };

  const handleCancelEdit = () => {
    setEditingPlanIndex(null);
    setNewPlanData({});
  };

  const handleAddPlan = async (e) => {
    e.preventDefault();
    await addPlan(newPlan);
    setIsAdding(false);
    setNewPlan({
      name: "",
      maxExhibitions: "",
      maxArtWorks: "",
      features: "",
      price: "",
    });
  };

  const handleDeletePlan = async (id) => {
    await deletePlan(id);
    setEditingPlanIndex(null);
  };

  const plansWithActions = plans.map((plan, index) => ({
    ...plan,
    actions: {
      onSave: handleSavePlan,
      onDelete: handleDeletePlan,
      onEdit: handleEditPlan,
    },
  }));

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-5">Manage Terms</h2>
      {isEditingTerms ? (
        <form onSubmit={handleSaveTerms} className="mb-5">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="terms">
              Edit Terms and Conditions
            </label>
            <textarea
              className="w-full px-3 py-2 border rounded"
              id="terms"
              rows="10"
              value={newTerms}
              onChange={(e) => setNewTerms(e.target.value)}
            ></textarea>
          </div>
          <button
            className="w-full bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Save Terms
          </button>
        </form>
      ) : (
        <div>
          <p className="mb-5 whitespace-pre-line">{terms}</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleEditTerms}
          >
            Edit Terms
          </button>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-5">Prices and Packages</h2>
      {isAdding ? (
        <form onSubmit={handleAddPlan} className="mb-5">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Package Name
            </label>
            <input
              className="w-full px-2 py-1 border rounded"
              type="text"
              id="name"
              value={newPlan.name}
              onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="maxExhibitions"
            >
              Max Exhibitions
            </label>
            <input
              className="w-full px-2 py-1 border rounded"
              type="number"
              id="maxExhibitions"
              value={newPlan.maxExhibitions}
              onChange={(e) =>
                setNewPlan({ ...newPlan, maxExhibitions: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="maxArtWorks">
              Max Artworks
            </label>
            <input
              className="w-full px-2 py-1 border rounded"
              type="number"
              id="maxArtWorks"
              value={newPlan.maxArtWorks}
              onChange={(e) =>
                setNewPlan({ ...newPlan, maxArtWorks: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="features">
              Features
            </label>
            <input
              className="w-full px-2 py-1 border rounded"
              type="text"
              id="features"
              value={newPlan.features}
              onChange={(e) =>
                setNewPlan({ ...newPlan, features: e.target.value })
              }
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="price">
              Price
            </label>
            <input
              className="w-full px-2 py-1 border rounded"
              type="text"
              id="price"
              value={newPlan.price}
              onChange={(e) =>
                setNewPlan({ ...newPlan, price: e.target.value })
              }
            />
          </div>
          <button
            className="w-full bg-green-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            Add Plan
          </button>
          <button
            className="w-full bg-red-500 text-white px-4 py-2 rounded mt-2"
            type="button"
            onClick={() => setIsAdding(false)}
          >
            Cancel
          </button>
        </form>
      ) : (
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mb-5"
          onClick={() => setIsAdding(true)}
        >
          Add Plan
        </button>
      )}
      <table className="min-w-full bg-white mb-5">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-1/6 py-2">Package</th>
            <th className="w-1/6 py-2">Exhibitions</th>
            <th className="w-1/6 py-2">Artworks</th>
            <th className="w-1/3 py-2">Features</th>
            <th className="w-1/6 py-2">Price</th>
            <th className="w-1/6 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan, index) => (
            <React.Fragment key={index}>
              {editingPlanIndex === index ? (
                <tr>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full px-2 py-1 border rounded"
                      type="text"
                      value={newPlanData.name}
                      onChange={(e) =>
                        setNewPlanData({ ...newPlanData, name: e.target.value })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full px-2 py-1 border rounded"
                      type="number"
                      value={newPlanData.maxExhibitions}
                      onChange={(e) =>
                        setNewPlanData({
                          ...newPlanData,
                          maxExhibitions: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full px-2 py-1 border rounded"
                      type="number"
                      value={newPlanData.maxArtWorks}
                      onChange={(e) =>
                        setNewPlanData({
                          ...newPlanData,
                          maxArtWorks: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full px-2 py-1 border rounded"
                      type="text"
                      value={newPlanData.features}
                      onChange={(e) =>
                        setNewPlanData({
                          ...newPlanData,
                          features: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      className="w-full px-2 py-1 border rounded"
                      type="text"
                      value={newPlanData.price}
                      onChange={(e) =>
                        setNewPlanData({
                          ...newPlanData,
                          price: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td className="border px-4 py-2 flex">
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                      onClick={handleSavePlan}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded"
                      onClick={() => handleDeletePlan(plan._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ) : (
                <tr
                  className="cursor-pointer"
                  onClick={() => handleEditPlan(index)}
                >
                  <td className="border px-4 py-2">{plan.name}</td>
                  <td className="border px-4 py-2">
                    {plan.maxExhibitions === null
                      ? "Unlimited exhibitions"
                      : `Up to ${plan.maxExhibitions} exhibitions`}
                  </td>
                  <td className="border px-4 py-2">
                    {plan.maxArtWorks === null
                      ? "Unlimited artworks"
                      : `Manage up to ${plan.maxArtWorks} artworks`}
                  </td>
                  <td className="border px-4 py-2">{plan.features}</td>
                  <td className="border px-4 py-2">{plan.price}$</td>
                  <td className="border px-4 py-2">Edit</td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTermsPricesPackages;
