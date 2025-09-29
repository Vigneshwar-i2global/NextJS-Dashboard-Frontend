import CustomTabs from "@/app/components/main/Ui/CustomTabs/CustomTabs";
import Category from "./Category/Category";

const CategoriesMain = () => {
  const tabItems = [
    { key: "1", label: "Category", children: <Category /> },
    { key: "2", label: "Attributes", children: <></>},

  ];

  return (
    <div>
      <CustomTabs tabs={tabItems} defaultActiveKey="1" />
    </div>
  );
};
export default CategoriesMain;
