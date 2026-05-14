'use client'

import type { NextPage } from 'next'
import { useEffect, useState, useCallback } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import SellerLayout from '@/components/seller/SellerLayout'
import { Wallet, Clock, AlertCircle, RefreshCw, Plus, X, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8001'

// ── Types ─────────────────────────────────────────────────────────────────────

type WalletData = {
  balance: string
  pending_balance: string
  total_earned: string
  total_withdrawn: string
  recent_transactions: {
    id: number
    amount: string
    transaction_type: 'credit' | 'debit'
    source: string
    reference_id: string
    created_at: string
  }[]
}

type WithdrawRequest = {
  id: number
  amount: string
  status: 'pending' | 'approved' | 'rejected' | 'paid'
  bank_details: Record<string, string>
  admin_notes: string | null
  created_at: string
}

const STATUS_STYLES: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-blue-100 text-blue-700',
  rejected: 'bg-red-100 text-red-700',
  paid: 'bg-green-100 text-green-700',
}

// ── Component ─────────────────────────────────────────────────────────────────

const SellerWithdrawalsPage: NextPage = () => {
  const { accessToken } = useAuth()

  const [wallet, setWallet] = useState<WalletData | null>(null)
  const [requests, setRequests] = useState<WithdrawRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Request form state
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const [bankDetails, setBankDetails] = useState({
    bank_name: '',
    account_name: '',
    account_number: '',
    iban: '',
  })

  // ── Data fetching ────────────────────────────────────────────────────────────

  const fetchData = useCallback(async () => {
    if (!accessToken) return
    setLoading(true)
    setError(null)
    try {
      const [walletRes, reqRes] = await Promise.all([
        fetch(`${API_BASE}/marketplace/vendor/wallet/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
        fetch(`${API_BASE}/marketplace/vendor/withdrawals/`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        }),
      ])
      if (!walletRes.ok || !reqRes.ok) throw new Error('Failed to load withdrawal data')
      const walletData = await walletRes.json()
      const reqData = await reqRes.json()
      setWallet(walletData.data)
      setRequests(reqData.data ?? [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }, [accessToken])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ── Submit withdrawal request ────────────────────────────────────────────────

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!accessToken) return
    setSubmitting(true)
    try {
      const res = await fetch(`${API_BASE}/marketplace/vendor/withdrawals/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          amount: parseFloat(withdrawAmount),
          bank_details: bankDetails,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message ?? 'Request failed')
      toast.success('Withdrawal request submitted!')
      setShowForm(false)
      setWithdrawAmount('')
      setBankDetails({ bank_name: '', account_name: '', account_number: '', iban: '' })
      fetchData()
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to submit request')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────────

  const balance = parseFloat(wallet?.balance ?? '0')
  const canWithdraw = balance >= 50

  const inputClass =
    'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-wave-orange/30 focus:border-wave-orange transition-colors'

  return (
    <SellerLayout title="Withdrawals">
      {loading && (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-wave-orange border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {error && !loading && (
        <div className="flex flex-col items-center py-16 gap-3 text-gray-400">
          <AlertCircle className="w-10 h-10 text-red-400" />
          <p className="text-sm">{error}</p>
          <button
            onClick={fetchData}
            className="flex items-center gap-1.5 text-sm text-wave-orange hover:underline"
          >
            <RefreshCw className="w-4 h-4" /> Retry
          </button>
        </div>
      )}

      {!loading && !error && wallet && (
        <>
          {/* Balance cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            <div className="bg-wave-dark text-white rounded-2xl p-5 shadow-sm sm:col-span-2 xl:col-span-1">
              <p className="text-xs font-medium text-white/50 uppercase tracking-wide">Available Balance</p>
              <p className="text-3xl font-bold mt-1">${Number(wallet.balance).toFixed(2)}</p>
              <button
                onClick={() => setShowForm(true)}
                disabled={!canWithdraw}
                className="mt-3 flex items-center gap-1.5 bg-wave-orange disabled:bg-white/10 disabled:cursor-not-allowed text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Request Payout
              </button>
              {!canWithdraw && (
                <p className="text-[10px] text-white/30 mt-1.5">Minimum balance $50.00 required</p>
              )}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Pending Balance</p>
              <p className="text-2xl font-bold text-wave-dark mt-1">
                ${Number(wallet.pending_balance).toFixed(2)}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Total Earned</p>
              <p className="text-2xl font-bold text-wave-dark mt-1">
                ${Number(wallet.total_earned).toFixed(2)}
              </p>
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Total Withdrawn</p>
              <p className="text-2xl font-bold text-wave-dark mt-1">
                ${Number(wallet.total_withdrawn).toFixed(2)}
              </p>
            </div>
          </div>

          {/* Withdrawal request form (inline) */}
          {showForm && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-sm font-semibold text-gray-700">New Withdrawal Request</h3>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleWithdraw} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    Amount (max: ${balance.toFixed(2)})
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={balance}
                    step="0.01"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Bank Name</label>
                    <input
                      type="text"
                      value={bankDetails.bank_name}
                      onChange={(e) => setBankDetails((b) => ({ ...b, bank_name: e.target.value }))}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Account Holder Name</label>
                    <input
                      type="text"
                      value={bankDetails.account_name}
                      onChange={(e) => setBankDetails((b) => ({ ...b, account_name: e.target.value }))}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">Account Number</label>
                    <input
                      type="text"
                      value={bankDetails.account_number}
                      onChange={(e) => setBankDetails((b) => ({ ...b, account_number: e.target.value }))}
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">IBAN (optional)</label>
                    <input
                      type="text"
                      value={bankDetails.iban}
                      onChange={(e) => setBankDetails((b) => ({ ...b, iban: e.target.value }))}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2.5 rounded-xl border border-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex items-center gap-2 bg-wave-orange hover:bg-amber-600 disabled:opacity-60 text-white text-sm font-medium px-5 py-2.5 rounded-xl transition-colors"
                  >
                    {submitting ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Submitting…</>
                    ) : (
                      <>Submit Request</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Withdrawal history */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-5">Withdrawal History</h3>

            {requests.length === 0 ? (
              <div className="flex flex-col items-center py-10 text-gray-300 gap-3">
                <Clock className="w-10 h-10" />
                <p className="text-sm">No withdrawals yet</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="border-b border-gray-100">
                    <tr>
                      <th className="text-left py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Date</th>
                      <th className="text-right py-2 text-xs font-semibold text-gray-400 uppercase tracking-wide">Amount</th>
                      <th className="text-left py-2 pl-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">Status</th>
                      <th className="text-left py-2 pl-4 text-xs font-semibold text-gray-400 uppercase tracking-wide hidden sm:table-cell">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {requests.map((r) => (
                      <tr key={r.id} className="hover:bg-gray-50/50">
                        <td className="py-3 text-gray-500 text-xs">
                          {new Date(r.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3 text-right font-semibold text-wave-dark">
                          ${Number(r.amount).toFixed(2)}
                        </td>
                        <td className="py-3 pl-4">
                          <span
                            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium capitalize ${
                              STATUS_STYLES[r.status] ?? 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {r.status}
                          </span>
                        </td>
                        <td className="py-3 pl-4 text-xs text-gray-400 hidden sm:table-cell">
                          {r.admin_notes || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Recent wallet transactions */}
          {wallet.recent_transactions.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-5">Recent Transactions</h3>
              <div className="space-y-2">
                {wallet.recent_transactions.map((txn) => (
                  <div key={txn.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-wave-dark capitalize">
                        {txn.source.replace(/_/g, ' ')}
                      </p>
                      <p className="text-xs text-gray-400">
                        {new Date(txn.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-bold ${
                        txn.transaction_type === 'credit' ? 'text-green-600' : 'text-red-500'
                      }`}
                    >
                      {txn.transaction_type === 'credit' ? '+' : '-'}${Number(txn.amount).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info footer */}
          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3">
            <Wallet className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-700">
              Withdrawals require a minimum balance of{' '}
              <strong>$50.00</strong>. Payouts are processed within 3–5 business days. A{' '}
              <strong>10% platform commission</strong> is automatically deducted from each sale.
            </p>
          </div>
        </>
      )}
    </SellerLayout>
  )
}

export default SellerWithdrawalsPage
