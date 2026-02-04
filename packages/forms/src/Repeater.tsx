/**
 * Repeater Component
 *
 * Dynamic field array management for forms
 */

import { useFieldArray } from 'react-hook-form';
import { useFormContext } from './FormContext';
import type { RepeaterProps, RepeaterField, RepeaterActions } from './types';

export function Repeater<T = any>(props: RepeaterProps<T>) {
  const { name, minItems = 0, maxItems, defaultItem, children } = props;

  const { form } = useFormContext();
  const { control } = form;

  const { fields, append, prepend, remove, move, swap, insert, update } = useFieldArray({
    control,
    name,
  });

  // Map fields to RepeaterField format
  const repeaterFields: RepeaterField<T>[] = fields.map((field, index) => ({
    id: field.id,
    value: field as T,
    index,
  }));

  // Actions
  const actions: RepeaterActions = {
    append: (item) => {
      if (maxItems && fields.length >= maxItems) {
        console.warn(`Cannot add more than ${maxItems} items`);
        return;
      }
      append(item || defaultItem);
    },
    prepend: (item) => {
      if (maxItems && fields.length >= maxItems) {
        console.warn(`Cannot add more than ${maxItems} items`);
        return;
      }
      prepend(item || defaultItem);
    },
    remove: (index) => {
      if (fields.length <= minItems) {
        console.warn(`Cannot remove below ${minItems} items`);
        return;
      }
      remove(index);
    },
    move,
    swap,
    insert: (index, item) => {
      if (maxItems && fields.length >= maxItems) {
        console.warn(`Cannot add more than ${maxItems} items`);
        return;
      }
      insert(index, item || defaultItem);
    },
    update,
  };

  return <>{children(repeaterFields, actions)}</>;
}

Repeater.displayName = 'Repeater';
