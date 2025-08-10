
import { Lock, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"


const NoSubscription = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <div className="p-8 text-center space-y-6">
          {/* Icon */}
          <div className="relative">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-6 h-6 text-yellow-500 animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-800">Premium Content</h1>
            <p className="text-slate-600 leading-relaxed">
              Unlock exclusive features and content with a premium subscription. Join thousands of satisfied users
              today!
            </p>
          </div>

          {/* Features */}
          <div className="bg-slate-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center text-sm text-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Unlimited access to all content
            </div>
            <div className="flex items-center text-sm text-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Priority customer support
            </div>
            <div className="flex items-center text-sm text-slate-700">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Cancel anytime
            </div>
          </div>

          {/* CTA Button */}
          <button
            asChild
            className="w-full bg-gradient-to-r from-[#0A3161] to-[#1e40af] hover:from-[#0A3161]/90 hover:to-[#1e40af]/90 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            <Link to="/">Subscribe Now</Link>
          </button>

        </div>
      </div>
    </div>
  )
}

export default NoSubscription

