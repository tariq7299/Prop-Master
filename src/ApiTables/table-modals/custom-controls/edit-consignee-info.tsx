// import React, { useEffect, useMemo } from "react"
// import { useForm, Controller } from 'react-hook-form'
// import Select from 'react-select'
// import useApp from "../../../hooks/useApp"
// import { useTableRowActions } from "../../table-providers/row-actions-provider.tsx"


// function EditConsigneeInfoForm({ action, closeModal }: any) {
//     const { rowActionsPostHandler, rowActionPostLoading } = useTableRowActions()
//     const { originalCities } = useApp()
//     const { register, handleSubmit, control, setValue, formState: { errors } } = useForm()

//     // ... [Memo] Map consignee cities
//     const assignedCities = useMemo(() => {
//         return originalCities?.filter(city => action?.payload?.available_cities_ids?.includes(city?.id))
//     }, [originalCities, action])


//     // --------------------------------------------------------------------
//     //    🎯  [ASYNC FUNCTION] HANDLE SUBMITTING CONSIGNEE NEW INFO
//     // --------------------------------------------------------------------



//     // ... Submit custom control form data
//     function submitCustomControlForm(data) {
//         rowActionsPostHandler(action?.method, action?.url?.web, { ...action?.payload, ...data, consignee_city_id: data?.consignee_city_id?.value }, action)
//     }

//     // ... Set Form data default values
//     useEffect(() => {
//         setValue('consignee_address_line_1', action?.payload?.consignee_address_line_1)
//         setValue('consignee_city_id', originalCities?.filter(city => city?.id === action?.payload?.consignee_city_id)?.map(city => ({
//             ...city,
//             label: city?.name_ar,
//             value: city?.id
//         }))[0] || {})
//     }, [action, originalCities])



//     return (
//         <>
//             <form onSubmit={handleSubmit(submitCustomControlForm)} className="row g-4">
//                 <div className="col-lg-6">
//                     <div className="form-floating">
//                         <Controller
//                             name='consignee_city_id'
//                             control={control}
//                             rules={{ required: 'من فضلك اختر مدينة' }}
//                             render={({ field }) => (
//                                 <Select
//                                     {...field}
//                                     classNamePrefix='react-select'
//                                     className='form-select p-0 border-0'
//                                     placeholder='اختر المدينة'
//                                     options={assignedCities?.map((city) => {
//                                         return {
//                                             ...city,
//                                             label: city?.name_ar,
//                                             value: city?.id
//                                         }
//                                     })}

//                                 />
//                             )}
//                         />
//                         {errors?.consignee_city_id && (
//                             <span className='invalid-feedback d-block'>{errors.consignee_city_id?.message}</span>
//                         )}

//                     </div>
//                 </div>

//                 <div className="col-lg-6">
//                     <div className="form-floating">
//                         <input
//                             type='text'
//                             className='form-control'
//                             placeholder='ادخل شارة العنوان'
//                             name='consignee_address_line_1'
//                             {...register('consignee_address_line_1', {
//                                 required: {
//                                     value: true,
//                                     message: 'من فضلك ادخل عنوان المستلم'
//                                 },
//                                 minLength: {
//                                     value: 2,
//                                     message: 'عنوان المستلم يجب ألا يقل عن حرفين'
//                                 },
//                                 maxLength: {
//                                     value: 100,
//                                     message: 'عنوان المستلم يجب ألا يزيد عن 100 حرف'
//                                 }
//                             })}
//                         />
//                         <label className="text-nowrap">عنوان المستلم</label>
//                         {errors?.consignee_address_line_1 && (
//                             <span className='invalid-feedback d-block'>{errors.consignee_address_line_1?.message}</span>
//                         )}
//                     </div>
//                 </div>



//                 <div className="col-12">
//                     <div className="row g-3">
//                         <div className="col-lg-6">
//                             <button className="btn btn-primary w-100 py-2" type="submit" disabled={rowActionPostLoading}>
//                                 {rowActionPostLoading ? 'جاري التعديل' : 'تعديل'}
//                             </button>
//                         </div>
//                         <div className="col-lg-6">
//                             <button className="btn btn-opac-dark w-100 py-2" type="button" onClick={closeModal}>إغلاق</button>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </>
//     )
// }

// export default EditConsigneeInfoForm
