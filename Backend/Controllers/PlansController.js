import PlanModel from '../Models/Plan.js';

// Create a new plan
export const createPlan = async (req, res) => {
  try {
    const planData = req.body;
    planData.planId = planData.name.split(' ').join('').toLowerCase();
    
    const newPlan = new PlanModel(req.body);
    await newPlan.save();
    res.status(201).json({
      message: 'Plan created successfully',
      success: true,
      data: newPlan,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

// Get all plans
export const getPlans = async (req, res) => {
  try {
    const plans = await PlanModel.find();
    res.status(200).json({
      message: 'Plans retrieved successfully',
      success: true,
      data: plans,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

// Get a single plan by ID
export const getPlanById = async (req, res) => {
  try {
    const plan = await PlanModel.findById(req.params.id);
    if (!plan) {
      return res.status(404).json({
        message: 'Plan not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Plan retrieved successfully',
      success: true,
      data: plan,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

// Update a plan by ID
export const updatePlan = async (req, res) => {
  try {
    const updatedPlan = await PlanModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlan) {
      return res.status(404).json({
        message: 'Plan not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Plan updated successfully',
      success: true,
      data: updatedPlan,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};

// Delete a plan by ID
export const deletePlan = async (req, res) => {
  try {
    const deletedPlan = await PlanModel.findByIdAndDelete(req.params.id);
    if (!deletedPlan) {
      return res.status(404).json({
        message: 'Plan not found',
        success: false,
      });
    }
    res.status(200).json({
      message: 'Plan deleted successfully',
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error',
      success: false,
    });
  }
};
