import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import FieldItemInput from "./FieldItemInput";
import { toast } from "react-toastify";

export interface FieldSchemaItem<K> {
  id: keyof K;
  display: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
}

export type FieldSchema<K> = FieldSchemaItem<K>[];

interface FieldProps<T> {
  label: string;
  fieldListSchema: FieldSchema<T>;
  initialValues?: T[];
  primaryLabel: keyof T;

  onFieldUpdate: (data: T[]) => void;
}

export default function FieldContainer<T>({
  label,
  primaryLabel,
  initialValues,
  fieldListSchema,
  onFieldUpdate,
}: FieldProps<T>) {
  const [values, setValues] = useState<T[]>(
    initialValues === undefined ? [] : [...initialValues],
  );

  useEffect(() => {
    if (initialValues !== undefined) {
      setValues([...initialValues]);
    }
  }, [initialValues]);

  const handleDeleteItem = (indexToRemove: number) => {
    if (values.length > 1) {
      const newValues = structuredClone(values);
      newValues.splice(indexToRemove, 1);
      setValues(newValues);
    }
  };

  const handleAddItem = () => {
    const schemaFieldIds = fieldListSchema.map((map) => map.id);
    // If the last item is
    const lastElement = values[values.length - 1];

    if (
      values.length > 0 &&
      schemaFieldIds.every((identity) => lastElement[identity] === "")
    ) {
      return toast.error(`You are not filled the last element`);
    }

    // create a empty template from schema.id
    const emptyValue: T = schemaFieldIds.reduce((map, object) => {
      // @ts-ignore
      map[object.toString()] = "";
      return map;
    }, {}) as T;

    setValues((values) => [...values, emptyValue]);
  };

  const handleFieldItemChange = () => {
    // alert(``)
  };

  const handleFieldItemUpdate = (index: number, data: T) => {
    let clonedObject = structuredClone(values);
    clonedObject[index] = data;
    setValues(clonedObject);

    onFieldUpdate(clonedObject);
  };

  return (
    <div className="mt-2 col-span-full">
      <label
        htmlFor="street-address"
        className="flex items-center text-sm font-medium leading-6 text-gray-900"
      >
        <span className="text-xl font-bold leading-7 text-center text-green-600 font-Outfit">
          {label}
        </span>
      </label>

      {/* Field items */}
      <div className={classNames(`flex flex-col gap-2`)}>
        {values.length === 0 ? (
          <div className={classNames(`text-zinc-400`)}>
            There are no item, please try to add a new one.
          </div>
        ) : (
          values.map((value, index) => {
            return (
              <FieldItemInput
                key={index}
                value={value}
                index={index}
                schema={fieldListSchema}
                primaryLabel={primaryLabel}
                onFieldItemChange={handleFieldItemChange}
                onUpdateFields={handleFieldItemUpdate}
                removable={values.length > 0}
                onDeleteItem={handleDeleteItem}
              />
            );
          })
        )}
      </div>

      {/* Add button at bottom */}
      <div className={classNames(`flex flex-row-reverse`)}>
        <button
          className={classNames(
            `mt-4 flex flex-row items-center text-white gap-2`,
            `bg-emerald-600 hover:bg-emerald-800 px-2 py-1 rounded-xl`,
            `transition-colors ease-in-out duration-100 group`,
          )}
          onClick={handleAddItem}
          type="button"
        >
          <PlusIcon
            className="w-5 h-5 cursor-pointer"
            onClick={handleAddItem}
          />
          <span className={classNames(`text-sm`)}>Add new </span>
        </button>
      </div>
    </div>
  );
}
