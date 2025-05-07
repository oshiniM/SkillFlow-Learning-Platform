import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Space, Typography, message } from "antd";
import { useSnapshot } from "valtio";
import state from "../../Utils/Store";
import LearningProgressService from "../../Services/LearningProgressService";

const { TextArea } = Input;
const { Title } = Typography;

// 🎨 Define consistent theme colors for UI elements
const themeColors = {
  primary: "#9B59B6", // Rich purple for main branding
  secondary: "#BA68C8", // Lighter lavender for contrast and softness
  accent: "#8E44AD", // Deep purple for highlights and calls to action
  background: "#F3E5F5", // Very light lavender for a clean, soft backdrop
  surface: "#E1BEE7", // Gentle purple surface color
  cardBg: "#FFFFFF", // White for card clarity
  textPrimary: "#2E1A47", // Dark violet for strong readability
  textSecondary: "#6A5C7A", // Muted purple-gray for secondary text
  border: "rgba(0, 0, 0, 0.12)", // Neutral border remains unchanged
  hover: "#7E57C2", // Slightly darker purple for hover effects
  danger: "#D32F2F", // Keeping red for clear warnings
  success: "#388E3C", // Keeping green for clarity on success
  gradient: "linear-gradient(135deg, #9B59B6 0%, #BA68C8 100%)", // Smooth purple gradient
};

const EditLearningProgressModal = () => {
  const snap = useSnapshot(state);           // Reactively access global state
  const selectedPlan = snap.selectedLearningProgress;
  const [updateLoading, setUpdateLoading] = useState(false);
  const [form] = Form.useForm();

  //Reset form fields when the selected plan changes
  useEffect(() => {
    if (selectedPlan && form) {
      form.setFieldsValue({
        planName: selectedPlan.planName,
        description: selectedPlan.description,
        routines: selectedPlan.routines,
        goal: selectedPlan.goal,
      });
    }
  }, [selectedPlan, form]);

  // Handle form submission for updating a plan
  const updateLearningProgress = async (values) => {
    try {
      setUpdateLoading(true);
      // Build the updated learning plan body
      const body = { 
        ...values, 
        userId: snap.currentUser?.uid,
        lastUpdated: new Date().toISOString().split('T')[0],
        // Preserve existing values for fields we're not updating
        category: selectedPlan.category,
        completedItems: selectedPlan.completedItems,
        totalItems: selectedPlan.totalItems
      };
      
      // Call backend to update learning progress
      await LearningProgressService.updateLearningProgress(selectedPlan.id, body);
      
      // Update the state without page refresh
      const updatedPlans = await LearningProgressService.getAllLearningProgresss();
      state.LearningProgresss = updatedPlans;
      
      // Refresh the state with updated data
      const updatedPlan = updatedPlans.find(plan => plan.id === selectedPlan.id);
      if (updatedPlan) {
        state.selectedLearningProgress = updatedPlan;
      }
      
      // Close the modal
      state.editLearningProgressOpened = false;
      
      // Success message
      message.success("Learning Progress updated successfully!");
    } catch (error) {
      console.error("Failed to update Learning Progress:", error);
      
      // Error message
      message.error("Failed to update Learning Progress. Please try again.");
    } finally {
      setUpdateLoading(false);
    }
  };

  return (
    <Modal
      title={<Title level={4} style={{ color: themeColors.textPrimary }}>Edit Learning Plan</Title>}
      open={snap.editLearningProgressOpened}
      onCancel={() => {
        state.editLearningProgressOpened = false;
        form.resetFields();
      }}
      footer={null}
      destroyOnClose={true}
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={updateLearningProgress}
        initialValues={{
          planName: selectedPlan?.planName || "",
          description: selectedPlan?.description || "",
          routines: selectedPlan?.routines || "",
          goal: selectedPlan?.goal || "",
        }}
      >
        <Form.Item
          name="planName"
          label="Plan Name"
          rules={[{ required: true, message: "Please enter a plan name" }]}
        >
          <Input 
            placeholder="Enter plan name" 
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
        >
          <TextArea 
            placeholder="Describe your learning plan" 
            autoSize={{ minRows: 3, maxRows: 6 }}
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item
          name="routines"
          label="Skills to Learn (comma separated)"
        >
          <Input 
            placeholder="e.g. React, JavaScript, UI Design" 
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item
          name="goal"
          label="Tutorials & Resources"
        >
          <TextArea 
            placeholder="List tutorials or resources for this plan" 
            autoSize={{ minRows: 2, maxRows: 4 }}
            style={{ borderRadius: 8 }}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 16 }}>
          <Space style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button 
              onClick={() => {
                state.editLearningProgressOpened = false;
                form.resetFields();
              }}
              style={{ 
                borderRadius: 8, 
                borderColor: themeColors.primary,
              }}
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={updateLoading}
              style={{
                background: themeColors.primary,
                borderColor: themeColors.primary,
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(255, 107, 53, 0.2)"
              }}
            >
              Update Plan
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditLearningProgressModal;