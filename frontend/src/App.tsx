import React, { Fragment, useState, useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import "./App.css";
import Form from "@/components/Form/Form";
import FileUpload from "@/components/FileUpload/FileUpload";
import Input from "@/components/Input/Input";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import Pagination from "@/components/Pagination/Pagination";
import { AlertDanger, AlertSuccess } from "@/components/Alert";
import { Table, TableRow, TableCol } from "@/components/Table";
import { uploadFile, getPosts } from "@/services/uploadFile";

import { Post, GetPostsResponse } from "@/types/posts";
import { UploadResponse } from "@/types/upload";
import { OnChangePageValue } from "@/types/pagination";
import { AxiosResponse } from "axios";

function App() {
  const pageSize = 10;

  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");

  const {
    data: dataPosts,
    error: errorPosts,
    isLoading: isLoadingPosts,
    isSuccess: isSuccessPosts,
    refetch: refetchPosts,
  } = useQuery({
    queryKey: ["posts", offset],
    queryFn: async (): Promise<AxiosResponse<GetPostsResponse>> => {
      return await getPosts({ limit: pageSize, offset, search });
    },
  });

  const {
    mutate,
    isPending: isPendingUpload,
    isSuccess: isSuccessUpload,
  } = useMutation({
    mutationFn: (
      formData: FormData,
    ): Promise<AxiosResponse<UploadResponse>> => {
      return uploadFile(formData);
    },
    onSuccess: () => {
      refetchPosts();
    },
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    mutate(formData);
  };

  const onUpdateSearch = useCallback((value: string) => {
    setSearch(value);
  }, []);

  const onChangePage = useCallback((value: OnChangePageValue) => {
    setOffset(value && value.offset);
    refetchPosts();
  }, []);

  const updateSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setOffset(0);
    refetchPosts();
  };

  return (
    <div className="relative w-full">
      <Form onSubmit={onSubmit} className="relative">
        <FileUpload title="Upload data" id="file" disabled={isPendingUpload} />

        {isSuccessUpload && <AlertSuccess message="Upload successful!" />}

        <button
          type="submit"
          disabled={isPendingUpload}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded block w-full"
        >
          Submit
        </button>

        {isPendingUpload && (
          <div className="absolute w-full h-full flex flex-col justify-center bg-white bg-opacity-60 inset-0">
            <LoadingSpinner />
            <div className="text-center mt-4">Loading...</div>
          </div>
        )}
      </Form>

      <hr className="mt-4 mb-4" />

      <div className="mt-4 mb-4 relative w-full">
        <Form
          onSubmit={updateSearch}
          className="relative flex flex-row justify-between w-full"
        >
          <Input
            placeholder="Search..."
            className="w-4/5"
            initialValue={search}
            disabled={isLoadingPosts}
            onValueChange={onUpdateSearch}
          ></Input>
          <button
            type="submit"
            disabled={isLoadingPosts}
            className="bg-blue-500 text-white w-1/5 mt-2"
          >
            Search
          </button>
        </Form>

        {isLoadingPosts ? (
          <LoadingSpinner />
        ) : errorPosts ? (
          <AlertDanger message="Error loading data! Try again." />
        ) : (
          isSuccessPosts &&
          dataPosts &&
          Array.isArray(dataPosts.data.posts) && (
            <div className="w-full">
              <Table
                header={
                  <TableRow>
                    <TableCol>Post ID</TableCol>
                    <TableCol>ID</TableCol>
                    <TableCol>Name</TableCol>
                    <TableCol>Email</TableCol>
                    <TableCol>Body</TableCol>
                  </TableRow>
                }
                body={
                  <Fragment>
                    {dataPosts.data.posts.map((row: Post) => {
                      return (
                        <TableRow key={row.id}>
                          {Object.entries(row).map(([col, value], index) => {
                            if (index < 5) {
                              return (
                                <TableCol key={`${col}.${row.id}`}>
                                  <span>{value}</span>
                                </TableCol>
                              );
                            }
                          })}
                        </TableRow>
                      );
                    })}
                  </Fragment>
                }
              />

              <Pagination
                key={offset / pageSize + 1}
                selectedPage={offset / pageSize + 1}
                total={Number(dataPosts.data.total)}
                itemsPerPage={pageSize}
                onChangePage={onChangePage}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
