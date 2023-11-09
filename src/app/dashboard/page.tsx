import Welcome from "@/components/Dashboard/Welcome";
import React from "react";

export default async  function DashboardPage() {

  return (
    <div>
      <Welcome />
      Private Dashboard Page - User Need to login to view this page
    </div>
  );
}
