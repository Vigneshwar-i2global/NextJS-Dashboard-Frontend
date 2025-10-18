import CustomTabs from "@/app/components/main/Ui/CustomTabs/CustomTabs";
import Category from "./Category/Category";
import Attribute from "../Attributes/Attribute/Attribute";
import Unit from "../Units/Unit/Unit";
import Brand from "../Brands/Brand/Brand";
import Mapping from "../Mapping/Mapping";
const CategoriesMain = () => {
  const tabItems = [
    { key: "1", label: "Category", children: <Category /> },
    { key: "2", label: "Attributes", children: <Attribute/> },
    { key: "3", label: "Units", children: <Unit/> },
    { key: "4", label: "Brands", children: <Brand/> },
    { key: "5", label: "Mapping", children: <Mapping/> }

  ];

  return (
    <div>
      <CustomTabs tabs={tabItems} defaultActiveKey="1" />
    </div>
  );
};
export default CategoriesMain;
