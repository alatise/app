import { Category } from "@/lib/type";
import { Pressable, Text } from "react-native";

export const CategoryItem = ({
  selectCategory,
  setSelectCategory,
  item,
}: {
  selectCategory: Category;
  setSelectCategory: (category: Category) => void;
  item: Category;
}) => {
  //   const { selectCategory, setSelectCategory } = useProductCtx();

  const handleCategorySelect = () => {
    setSelectCategory(item);
  };

  return (
    <Pressable
      onPress={handleCategorySelect}
      className={`rounded-[8px] h-[38px] items-center flex-row px-8 mr-5 ${
        selectCategory.name! === item.name
          ? "bg-black"
          : "rounded-[8px] bg-[#F2F2F2]"
      }`}
    >
      <Text
        className={`text-[13px] font-inter-semibold ${
          selectCategory.name === item.name ? "text-white" : "text-[#222]"
        }`}
      >
        {item.name}
      </Text>
    </Pressable>
  );
};

export const ProductCategoryItem = ({
  selectCategory,
  setSelectCategory,
  item,
}: {
  selectCategory: Category;
  setSelectCategory: (category: Category) => void;
  item: Category;
}) => {
  const handleCategorySelect = () => {
    setSelectCategory(item);
  };
  return (
    <Pressable
      onPress={handleCategorySelect}
      key={item.id}
      className={`rounded-[8px] h-[38px] items-center flex-row px-8 mr-5 ${
        selectCategory.name! === item.name ? "bg-black" : "bg-[#F2F2F2]"
      }`}
    >
      <Text
        className={`text-[13px] font-montserrat-Regular ${
          selectCategory.name! === item.name ? "text-white" : "text-[#222]"
        }`}
      >
        {item.name}
      </Text>
    </Pressable>
  );
};
