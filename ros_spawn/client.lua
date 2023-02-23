ESX = nil
local first = true

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

--Create Ped
Citizen.CreateThread(function()
	local ped_hash = GetHashKey('ig_josh')
	RequestModel(ped_hash)
	while not HasModelLoaded(ped_hash) do
		Citizen.Wait(1)
	end	
	NPC = CreatePed(1, ped_hash, -1396.74, -1016.14, 20.59 , 110.25, false, true)
	SetBlockingOfNonTemporaryEvents(NPC, true)
	SetPedDiesWhenInjured(NPC, false)
	SetPedCanPlayAmbientAnims(NPC, true)
	SetPedCanRagdollFromPlayerImpact(NPC, false)
	SetEntityInvincible(NPC, true)
	FreezeEntityPosition(NPC, true)
end)

--Marker
Citizen.CreateThread(function()
	while first do
		Citizen.Wait(5)

		local coords = GetEntityCoords(PlayerPedId())

		local distance = GetDistanceBetweenCoords(coords, vector3(-1396.74, -1016.14, 20.59), true)

		if distance < 2 then
			ESX.ShowHelpNotification("Pulsa ~INPUT_PICKUP~ para hablar con Josh")
			if IsControlJustReleased(0, 38) then
				first = false
				SetNuiFocus(true,true)
				SendNUIMessage({
					type = "hablar",
					hablar = true
				})
			end
		end
	end
end)

--Nui Callback teleport to tawnhall
RegisterNUICallback('closeAfirmativo', function(data, cb)
	SetNuiFocus(false,false)
	local myid = GetPlayerServerId(PlayerId())
	DoScreenFadeOut(1000)
	Citizen.Wait(2000)
	SetEntityCoords(PlayerPedId(), -543.47, -207.1, 37.65)
    SetEntityHeading(PlayerPedId(), 207.82)
	Citizen.Wait(1500)
	DoScreenFadeIn(1000)
end)

--Nui Callback no teleport
RegisterNUICallback('closeNegativo', function(data, cb)
	SetNuiFocus(false,false)
	local myid = GetPlayerServerId(PlayerId())
	DoScreenFadeOut(1000)
	Citizen.Wait(2000)
	SetEntityCoords(PlayerPedId(), -1429.4, -1007.54, 4.69)
    SetEntityHeading(PlayerPedId(), 134.12)
	Citizen.Wait(1500)
	DoScreenFadeIn(1000)
end)