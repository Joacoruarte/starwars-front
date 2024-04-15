import { ChevronDownIcon } from '@heroicons/react/16/solid';
import clsx from 'clsx';
import { Fragment } from 'react';

interface FilterProps<T extends Record<string, any>> {
  onOpenItemsDropdown: () => void;
  openItemsDropdown: boolean;
  selectedItem: string;
  onSelectItem: (item?: T) => void;
  itemsFilterTitle: string;
  items: T[];
  itemPropertyName: string;
  isFilterable: boolean;
}

export default function Filter<T extends Record<string, any>>({
  onOpenItemsDropdown,
  openItemsDropdown,
  itemsFilterTitle,
  selectedItem,
  onSelectItem,
  items,
  itemPropertyName,
  isFilterable,
}: FilterProps<T>) {
  return (
    <div className='flex items-center gap-4'>
      <span className='text-lg font-[500]'>{itemsFilterTitle}:</span>
      <div
        className={clsx(
          'flex items-center justify-center gap-2 relative bg-light-gray px-6 py-2 rounded-3xl z-10',
          {
            ['hover:bg-gray-800 transition-colors duration-200 cursor-pointer']:
              !openItemsDropdown && isFilterable,
          }
        )}
        onClick={()=> {
          if (!isFilterable) return;
          onOpenItemsDropdown()
        }}
      >
        <span>{selectedItem}</span>
        {isFilterable && <ChevronDownIcon className='w-7 h-7' />}
        <div
          className={clsx({
            ['hidden']: !openItemsDropdown,
            ['max-w-full flex z-20 flex-col gap-2 absolute top-12 left-0 bg-light-gray rounded-3xl border px-2 py-2 max-h-40 overflow-auto']:
              openItemsDropdown,
          })}
        >
          {items.map((item, index: number) => (
            <Fragment key={item.id}>
              {index === 0 && (
                <p
                  className={clsx(
                    'px-4 py-2 hover:bg-gray-800 transition-colors duration-200 rounded-3xl',
                    {
                      ['bg-gray-800']:
                        selectedItem === 'Todos' || !selectedItem,
                    }
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedItem === 'Todos' || !selectedItem) return;
                    onSelectItem();
                  }}
                >
                  Todos
                </p>
              )}
              <p
                className={clsx(
                  'px-4 py-2 hover:bg-gray-800 transition-colors duration-200 rounded-3xl',
                  {
                    ['bg-gray-800']: selectedItem === item[itemPropertyName],
                  }
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectItem(item);
                }}
              >
                {item[itemPropertyName]}
              </p>
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
