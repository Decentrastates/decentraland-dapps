import { loadingReducer, LoadingState } from '../loading/reducer'
import {
  CloseManaFiatFeedbackModalRequestAction,
  CLOSE_MANA_FIAT_FEEDBACK_MODAL_REQUEST,
  ManaFiatGatewayPurchaseCompletedFailureAction,
  MANA_FIAT_GATEWAY_PURCHASE_COMPLETED_FAILURE,
  OpenManaFiatFeedbackModalRequestAction,
  OpenManaFiatGatewayFailureAction,
  OpenManaFiatGatewayRequestAction,
  OpenManaFiatGatewaySuccessAction,
  OPEN_MANA_FIAT_FEEDBACK_MODAL_REQUEST,
  OPEN_MANA_FIAT_GATEWAY_FAILURE,
  OPEN_MANA_FIAT_GATEWAY_REQUEST,
  OPEN_MANA_FIAT_GATEWAY_SUCCESS
} from './actions'

export type ManaFiatGatewayState = {
  data: { showFeedback?: boolean }
  loading: LoadingState
  error: string | null
}

export const INITIAL_STATE: ManaFiatGatewayState = {
  data: { showFeedback: false },
  loading: [],
  error: null
}

export type ManaFiatGatewayReducerAction =
  | OpenManaFiatGatewayRequestAction
  | OpenManaFiatGatewaySuccessAction
  | OpenManaFiatGatewayFailureAction
  | ManaFiatGatewayPurchaseCompletedFailureAction
  | OpenManaFiatFeedbackModalRequestAction
  | CloseManaFiatFeedbackModalRequestAction

export function manaFiatGatewayReducer(
  state: ManaFiatGatewayState = INITIAL_STATE,
  action: ManaFiatGatewayReducerAction
): ManaFiatGatewayState {
  switch (action.type) {
    case OPEN_MANA_FIAT_GATEWAY_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: null
      }
    }
    case OPEN_MANA_FIAT_GATEWAY_SUCCESS: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case OPEN_MANA_FIAT_GATEWAY_FAILURE: {
      const { error } = action.payload
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error
      }
    }
    case MANA_FIAT_GATEWAY_PURCHASE_COMPLETED_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    case OPEN_MANA_FIAT_FEEDBACK_MODAL_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          showFeedback: true
        },
        error: null
      }
    }
    case CLOSE_MANA_FIAT_FEEDBACK_MODAL_REQUEST: {
      return {
        ...state,
        data: {
          ...state.data,
          showFeedback: false
        },
        error: null
      }
    }
    default:
      return state
  }
}
