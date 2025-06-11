import React from 'react'
import Modal from '../uiComponents/Modal'
import AddressForm from './AddressForm'
import { auth } from '@/auth'
import { getAddress } from '@/lib/api'

const AddressFormContainer = async () => {

    const session = await auth()
    const email = session?.user?.email

    const address = await getAddress(email)
    // console.log(address)

  return (
    <Modal addressForm address={address}>
          <AddressForm email={email} address={address} />
    </Modal>
  )
}

export default AddressFormContainer