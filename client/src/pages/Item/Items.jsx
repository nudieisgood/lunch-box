import { useLoaderData, useSubmit, Form, Await, defer } from "react-router-dom";
import {
  FormRowSelect,
  Pagination,
  ItemBox,
  ScreenLoader,
} from "../../components";
import { useAppContext } from "../../context/AppContext";
import customFetch from "../../utilities/customFetch";
import { Suspense } from "react";

const filter = {
  ALL: "all",
  JACKET: "jacket",
  PANTS: "pants",
  SHIRT: "shirt",
  top: "top",
  HAT: "hat",
  ACCESSORY: "accessory",
};

const statusfilter = {
  ALL: "all",
  COMINGSOON: "coming soon",
  NEWARRIVAL: "new arrivals",
  ONSALE: "sale",
};

export const loader = async ({ request }) => {
  const queryEntriesArr = [...new URL(request.url).searchParams.entries()];
  const queryObj = Object.fromEntries(queryEntriesArr);

  try {
    const res = customFetch.get("items", {
      params: queryObj,
    });

    return defer({
      items: res,
    });
  } catch (error) {
    return error;
  }
};

const Items = () => {
  const queryEntriesArr = [
    ...new URL(window.location.href).searchParams.entries(),
  ];
  const searchValues = Object.fromEntries(queryEntriesArr);

  const loaderPromise = useLoaderData();
  const submit = useSubmit();
  const { user } = useAppContext();

  return (
    <div className="page-container items-page">
      <Suspense fallback={<ScreenLoader />}>
        <Await resolve={loaderPromise.items}>
          {(loaderData) => {
            const { totalItems, currentPage } = loaderData.data;
            const { data: items } = loaderData.data;
            return (
              <>
                <div className="items-page__filter-bar">
                  <h1 className="heading-1">
                    {searchValues?.typeFilter || "all"}
                  </h1>
                  <p className="heading-2">{totalItems} items</p>

                  <Form className="items-page__filter">
                    <FormRowSelect
                      name="statusFilter"
                      list={[...Object.values(statusfilter)]}
                      defaultValue={searchValues?.statusFilter}
                      onChange={(e) => {
                        submit(e.currentTarget.form);
                      }}
                    />
                    <FormRowSelect
                      name="typeFilter"
                      list={[...Object.values(filter)]}
                      defaultValue={searchValues?.typeFilter}
                      onChange={(e) => {
                        submit(e.currentTarget.form);
                      }}
                    />
                  </Form>
                </div>

                <div className="items-page__items-container">
                  {items?.map((item) => (
                    <ItemBox key={item._id} item={item} user={user} />
                  ))}
                </div>

                {totalItems > 16 && (
                  <Pagination
                    totalPages={Math.ceil(totalItems / 16)}
                    totalItems={items.length}
                    currentPage={currentPage}
                  />
                )}
              </>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
};
export default Items;
