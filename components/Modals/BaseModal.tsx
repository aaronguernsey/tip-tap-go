import { Dialog, Transition } from "@headlessui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

export interface IBaseModalProps {
  title?: string;
  isOpen: boolean;
  children?: React.ReactNode;
  handleClose: () => void;
}

export const BaseModal = ({
  title,
  children,
  isOpen,
  handleClose,
}: IBaseModalProps) => {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        static
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => null}
      >
        <div className="flex min-h-full items-center justify-center py-10 px-4 text-center sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 min-h-screen bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block transform transition-all overflow-hidden rounded-lg bg-white px-4 py-4 text-left align-bottom shadow-xl dark:bg-gray-800 sm:my-8 w-full max-w-sm sm:p-6 sm:align-middle">
              <button
                onClick={() => handleClose()}
                tabIndex={0}
                aria-pressed="false"
                className="absolute right-4 top-4"
              >
                <XCircleIcon className="h-6 w-6 cursor-pointer dark:stroke-white" />
              </button>
              <div>
                <div>
                  <Dialog.Title
                    as="h3"
                    className="text-base text-center font-medium leading-6 uppercase text-gray-900 dark:text-gray-100 mb-5"
                  >
                    {title}
                  </Dialog.Title>
                  <div>{children}</div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
