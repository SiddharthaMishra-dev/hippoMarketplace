import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductReel from "@/components/ProductReel";
import { PRODUCT_CATEGORIES } from "@/config";

type Params = string | string[] | undefined;

interface ProductPageProps {
  searchParams: { [key: string]: Params };
}

const parse = (param: Params) => {
  return typeof param === "string" ? param : undefined;
};

const page = ({ searchParams }: ProductPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label;

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={label ?? "Browser high quality assets"}
        query={{
          category,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};

export default page;
