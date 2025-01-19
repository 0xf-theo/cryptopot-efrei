<?php

namespace App\Controller;

use App\Repository\AssociationRepository;
use App\Entity\Association;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Serializer\Normalizer\AbstractNormalizer;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Nelmio\ApiDocBundle\Annotation\Model;
use Nelmio\ApiDocBundle\Annotation\Security;
use OpenApi\Attributes as OA;

#[OA\Tag(name: 'Association')]
class AssociationController extends AbstractController
{


    //Liste des associations
    #[Route('/associations', name: 'association', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Returns all associations',
        content: new OA\JsonContent(
            type: 'array',
            items: new OA\Items(ref: new Model(type: Association::class))
        )
    )]
    public function getAssociationList(AssociationRepository $ass_repo, SerializerInterface $serializer): JsonResponse
    {
        $ass_list = $ass_repo->findAll();
        $json_ass_list = $serializer->serialize($ass_list, 'json');

        return new JsonResponse($json_ass_list, Response::HTTP_OK, [], true);
    }


    //Recuperer une association en particulier
    #[Route('/associations/{id}', name: 'one_association', methods: ['GET'])]
    #[OA\Response(
        response: 200,
        description: 'Get data of an association',
        content: new Model(type: Association::class)
    )]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        description: 'Id of the association',
        schema: new OA\Schema(type: 'string')
    )]
    public function getOneAssociation(int $id, AssociationRepository $ass_repo, SerializerInterface $serializer): JsonResponse
    {
        $association = $ass_repo->find($id);

        if($association){
            $json_ass = $serializer->serialize($association, 'json');
            return new JsonResponse($json_ass, Response::HTTP_OK, [], true);
        }
        return new JsonResponse(null, Response::HTTP_NOT_FOUND);
    }

    //Creer une association
    #[Route('/c-associations', name: 'create_association', methods: ['POST'])]
    #[OA\Response(
        response: 200,
        description: 'Create an association',
        content: new Model(type: Association::class)
    )]
    #[OA\RequestBody(
        required: true,
        content: new Model(type: Association::class)
    )]
    //#[Security(name: 'Bearer')]
    public function createAssociation(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, AssociationRepository $ass_repo): JsonResponse
    {
        $association = $serializer->deserialize($request->getContent(), Association::class, 'json');

        if($ass_repo->findOneBy(array('mail' => $association->getMail()))){
            return new JsonResponse("Already exist", Response::HTTP_FOUND, [], true);
        }
        if($ass_repo->findOneBy(array('name' => $association->getName()), array('name' => 'ASC'))){
            return new JsonResponse("Already exist", Response::HTTP_FOUND, [], true);
        }
        if($ass_repo->findOneBy(array('phone_number' => $association->getPhone_number()))){
            return new JsonResponse("Already exist", Response::HTTP_FOUND, [], true);
        }

        $json_association = $serializer->serialize($association, 'json');
        $em->persist($association);
        $em->flush();

        return new JsonResponse($json_association, Response::HTTP_CREATED, [], true);
    }


    //Modifier une association
    #[Route('/api/associations/{id}', name: 'updateAssociation', methods: ['PUT'])]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        description: 'Id of the association',
        schema: new OA\Schema(type: 'string')
    )]
    #[OA\RequestBody(
        required: true,
        content: new Model(type: Association::class)
    )]
    #[Security(name: 'Bearer')]
    public function updateAssociation(Request $request, SerializerInterface $serializer, EntityManagerInterface $em, Association $currentAsso): JsonResponse
    {
        $updatedAsso = $serializer->deserialize($request->getContent(), Association::class, 'json', [AbstractNormalizer::OBJECT_TO_POPULATE => $currentAsso]);
        $em->persist($updatedAsso);
        $em->flush();
        return new JsonResponse('Modification reussite', Response::HTTP_NO_CONTENT, [], true);
    }


    //Supprimer une association
    #[Route('/api/associations/{id}', name: 'deleteAssociation', methods: ['DELETE'])]
    #[OA\Parameter(
        name: 'id',
        in: 'path',
        description: 'Id of the association',
        schema: new OA\Schema(type: 'string')
    )]
    #[Security(name: 'Bearer')]
    public function deleteAssociation(Association $asso, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($asso);
        $em->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
