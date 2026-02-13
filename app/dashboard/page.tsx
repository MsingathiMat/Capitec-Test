"use client"
import LoadingProgress from '@/components/shared/LoadingProgress'
import StatsCard from '@/components/shared/StatsCard'
import ToggleIsLoadingProcess from '@/components/shared/ToggleIsLoadingProcess'
import { useCustomerProfileQuery } from '@/redux/services/queryCustomerProfile'
import { RootState } from '@/redux/store/store'
import { Goal, HandCoins, UserCircle, UserRound } from 'lucide-react'
import React from 'react'
import { useSelector } from 'react-redux'
import { format } from "date-fns"
import { Users } from '@/constants/users'
import { useSpendingSummaryQuery } from '@/redux/services/querySpendingSummary'
import { useSpendingGolasQuery } from '@/redux/services/querySPendingGoals'
import CustomerTransactionTable from './transactions/page'
import MonthlyTrends from './monthlyTrends/page'
import Profile from './profile/page'
import SpendingSummary from './spendingSummary/page'
import Goals from './spendingGoals/page'
import AllCategories from './allCategories/page'


function Page() {

  const { data: customerData } = useCustomerProfileQuery({ customerId: Users.JohnUserId })

  const { data: SpendingSUmmaryData, isFetching: isSpenfingQuearyLoading } = useSpendingSummaryQuery({ customerId: Users.JohnUserId })

  const {data:SpendingGoalsData, isFetching:isSpendingGoals}=useSpendingGolasQuery({ customerId: Users.JohnUserId })



const LatestSpendingGoal =SpendingGoalsData? SpendingGoalsData[SpendingGoalsData?.length-1]:null
  let FormattedDate = ""

  if (customerData?.joinDate) {
    FormattedDate = format(
      new Date(customerData.joinDate),
      "dd MMMM yyyy"
    )


  }
  return (
    <div className='p-10 CENTER flex-col gap-20 items-start!'>

      <div className='CENTER flex-col items-start! gap-1'>
        <h1 className=' H1 font-bold'>Dashboard </h1>
        <p className=' text-gray-400 FONT_ARIAL'>View customer spending overview, including transactions, goals, and account summary</p>
      </div>

      <div className=' CENTER gap-5 justify-start flex-wrap'>

        <ToggleIsLoadingProcess isLoading={!customerData}>

          {
            customerData && <StatsCard UrlLink="/dashboard/profile" Title={customerData?.name} BadgeTitle={customerData?.accountType} Icon={UserRound} Description={customerData?.email} BodyDescription={"Customer Id"} BodyTitle={`${customerData?.customerId}`} Footer={FormattedDate} />

          }

        </ToggleIsLoadingProcess>

        <ToggleIsLoadingProcess isLoading={isSpenfingQuearyLoading}>

          {
            SpendingSUmmaryData && <StatsCard UrlLink="/dashboard/spendingSummary" Title={"Spending"} BadgeTitle={`${SpendingSUmmaryData?.topCategory}`} Icon={HandCoins} Description={`Average Transaction: R${SpendingSUmmaryData?.averageTransaction}`} BodyDescription={"Total spent in the last 30 days"} BodyTitle={`R${SpendingSUmmaryData?.totalSpent}`} Footer={`Transaction Count: ${SpendingSUmmaryData?.transactionCount}`} />

          }

        </ToggleIsLoadingProcess>

           <ToggleIsLoadingProcess isLoading={isSpendingGoals}>

          {
            LatestSpendingGoal && <StatsCard UrlLink="/dashboard/spendingGoals" Title={"Latest Goal"} BadgeTitle={`${LatestSpendingGoal?.status}`} Icon={Goal} Description={`Days remaining: ${LatestSpendingGoal?.daysRemaining}`} BodyDescription={"Monthly Budget"} BodyTitle={`R${LatestSpendingGoal?.monthlyBudget}`} Footer={`Already Spent : R${LatestSpendingGoal?.currentSpent}`} />

          }

        </ToggleIsLoadingProcess>
      </div>
<MonthlyTrends/>
<AllCategories/>
      <CustomerTransactionTable/>

      <Profile/>
<SpendingSummary/>

<Goals/>
    </div>
  )
}

export default Page