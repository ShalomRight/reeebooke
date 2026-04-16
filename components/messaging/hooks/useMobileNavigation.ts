"use client"

import { useState, useCallback } from "react"

type MobileView = "filters" | "list" | "conversation"

export function useMobileNavigation() {
	const [currentView, setCurrentView] = useState<MobileView>("list")
	const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false)

	const showList = useCallback(() => {
		setCurrentView("list")
		setIsFilterDrawerOpen(false)
	}, [])

	const showConversation = useCallback(() => {
		setCurrentView("conversation")
		setIsFilterDrawerOpen(false)
	}, [])

	const showFilters = useCallback(() => {
		setIsFilterDrawerOpen(true)
	}, [])

	const closeFilters = useCallback(() => {
		setIsFilterDrawerOpen(false)
	}, [])

	const goBack = useCallback(() => {
		if (currentView === "conversation") {
			setCurrentView("list")
		} else if (currentView === "list" && isFilterDrawerOpen) {
			setIsFilterDrawerOpen(false)
		}
	}, [currentView, isFilterDrawerOpen])

	return {
		currentView,
		isFilterDrawerOpen,
		showList,
		showConversation,
		showFilters,
		closeFilters,
		goBack,
	}
}
